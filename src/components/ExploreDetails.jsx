import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Fade } from "react-awesome-reveal";
const ExploreDetails = () => {
  const { _id } = useParams(); // Retrieve '_id' from the route params
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://a10-game-review-server.vercel.app/exploreDetails/${_id}`);
        setDetails(response.data); // Ensure your backend returns appropriate details
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [_id]);

  if (!details) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <p className="text-2xl text-gray-700 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <header>
        <Navbar />
      </header>

      <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-r from-teal-400 to-blue-300 text-white rounded-2xl shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-yellow-300">
          {details.title}
        </h1>
        <img
          src={details.url}
          alt={details.title}
          className="w-full h-80 object-cover rounded-xl shadow-lg mb-8 hover:scale-105 transition-transform duration-300"
        />

        <div className="text-center space-y-6">
          <p className="text-2xl font-semibold">
            <span className="text-yellow-400">Genre:</span> {details.genres}
          </p>
         <Fade>
         <p className="text-lg leading-relaxed">{details.description}</p>
         </Fade>
          <span className="block text-2xl font-bold text-yellow-300">
            Rating: {details.ratingNmbr} / 5
          </span>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/">
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition-colors duration-300 font-bold">
              Back to Home
            </button>
          </Link>
        </div>
      </div>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
};

export default ExploreDetails;
