import React, { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Fade } from "react-awesome-reveal";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
const AllReviews = () => {
  const reviews = useLoaderData(); // Load initial reviews data
  const [filteredReviews, setFilteredReviews] = useState([]); // State to manage filtered reviews
  const [selectedGenre, setSelectedGenre] = useState(""); // State to track the selected genre
  const [sortOption, setSortOption] = useState(""); // Track selected sort option

  // Initialize filteredReviews with original reviews
  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

  // Handle filtering functionality
  const handleFilter = (genre) => {
    let filtered = reviews;

    if (genre !== "all") {
      filtered = reviews.filter((review) => review.genres === genre);
    }

    // Apply sorting after filtering
    if (sortOption) {
      filtered = applySort(filtered, sortOption);
    }

    setFilteredReviews(filtered); // Update filtered reviews
    setSelectedGenre(genre); // Update selected genre
  };

  // Handle sorting functionality
  const handleSort = (option) => {
    let sorted = [...filteredReviews];

    if (option) {
      sorted = applySort(sorted, option);
    }

    setFilteredReviews(sorted); // Update sorted reviews
    setSortOption(option); // Update selected sort option
  };

  // Apply sorting logic based on the selected option
  const applySort = (data, option) => {
    let sortedData = [...data];

    if (option === "rating-asc") {
      // Sort by Rating (Low to High)
      sortedData.sort((a, b) => a.rating - b.rating);
    } else if (option === "rating-desc") {
      // Sort by Rating (High to Low)
      sortedData.sort((a, b) => b.rating - a.rating);
    } else if (option === "year-old-to-new") {
      // Sort by Year (Old to New)
      sortedData.sort((a, b) => a.year - b.year);
    } else if (option === "year-new-to-old") {
      // Sort by Year (New to Old)
      sortedData.sort((a, b) => b.year - a.year);
    }

    return sortedData;
  };

  // Extract unique genres for the dropdown
  const genres = Array.from(new Set(reviews.map((review) => review.genres)));

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: 'ease-in-out', // Easing function
      offset: 100, // Offset (in px) before animation triggers
      delay: 0, // Delay (in ms)
    });
  }, []);

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="max-w-6xl mx-auto my-8">
        <Fade cascade damping={0.1}>
          <h1  className="text-4xl font-bold text-center mb-8 text-purple-600">
            All Reviews
          </h1>
        </Fade>

        {/* Filter and Sort Dropdowns */}
        <div className="flex justify-center space-x-4 mb-6">
          {/* Filter by Genres */}
          <select
            value={selectedGenre}
            onChange={(e) => handleFilter(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="all">All Genres</option>
            {genres.map((genre, idx) => (
              <option key={idx} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* Sort by Rating or Year */}
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Sort By</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="year-old-to-new">Year: Old to New</option>
            <option value="year-new-to-old">Year: New to Old</option>
          </select>
        </div>

        {/* Reviews Grid */}
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col"
              data-tooltip-id={`tooltip-${review._id}`}
              data-tooltip-content={`Rating: ${review.rating}/5, Year: ${review.year}`}
            >
              <img
                src={review.url}
                alt={review.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <Fade>
                <h2 className="text-xl font-semibold mb-2">{review.title}</h2>
              </Fade>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Rating:</strong> {review.rating} / 5
              </p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Genre:</strong> {review.genres}
              </p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Year:</strong> {review.year}
              </p>
              <Link
                to={`/review/${review._id}`}
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-400"
              >
                Explore Details
              </Link>
            </div>
          ))}
        </div>
        {/* Tooltip Component */}
        {filteredReviews.map((review) => (
          <Tooltip key={review._id} id={`tooltip-${review._id}`} />
        ))}
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AllReviews;
