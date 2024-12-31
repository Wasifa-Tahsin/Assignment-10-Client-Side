import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import Swal from 'sweetalert2';

const UpdateReview = () => {
  const review = useLoaderData();
  const { _id } = review || {};
  const [gameTitle, setGameTitle] = useState(review?.title || '');
  const [gameCoverImage, setGameCoverImage] = useState(review?.url || '');
  const [reviewDescription, setReviewDescription] = useState(review?.description || '');
  const [rating, setRating] = useState(review?.rating || 1);
  const [publishingYear, setPublishingYear] = useState(review?.year || '');
  const [genres, setGenres] = useState(review?.genres || 'Action');
  const [userEmail, setUserEmail] = useState(review?.email || 'user@example.com'); // Replace with logged-in user's email
  const [userName, setUserName] = useState(review?.name || 'John Doe'); // Replace with logged-in user's name

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const url=form.url.value
    const description = form.description.value;
    const rating = form.rating.value;
    const year = form.year.value;
    const genres = form.genres.value;
    const email = form.email.value;
    const name = form.name.value;

    // Prepare the review data
    const updatedData = {
      _id,
      title,
     url,
      description,
      rating,
      year,
      genres,
      email,
      name,
    };

    console.log(updatedData);

    // Send data to the server
    fetch(`https://a10-game-review-server.vercel.app/addReview/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount>0) {
          Swal.fire({
            title: 'Success!',
            text: 'Review Updated Successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
        }
      });
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="max-w-xl mx-auto mt-8 mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Review</h2>
        <form onSubmit={handleUpdateSubmit} className="space-y-6">
          <div>
            <label htmlFor="gameTitle" className="block text-lg">
              Game Title
            </label>
            <input
              name="title"
              type="text"
              id="gameTitle"
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>



          <div>
              <label htmlFor="gameCoverImage" className="block text-lg">Game Cover Image URL</label>
              <input
              name='url'
                type="text"
                id="gameCoverImage"
                value={gameCoverImage}
                onChange={(e) => setGameCoverImage(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

          <div>
            <label htmlFor="reviewDescription" className="block text-lg">
              Review Description
            </label>
            <textarea
              name="description"
              id="reviewDescription"
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="5"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-lg">
              Rating (1-5)
            </label>
            <input
              name="rating"
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="publishingYear" className="block text-lg">
              Publishing Year
            </label>
            <input
              name="year"
              type="date"
              id="publishingYear"
              value={publishingYear}
              onChange={(e) => setPublishingYear(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="genres" className="block text-lg">
              Genres
            </label>
            <select
              id="genres"
              name="genres"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Adventure">Adventure</option>
              <option value="Shooter">Shooter</option>
              <option value="Strategy">Strategy</option>
            </select>
          </div>

          <div>
            <label htmlFor="userEmail" className="block text-lg">
              Your Email
            </label>
            <input
              name="email"
              type="email"
              id="userEmail"
              value={userEmail}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="userName" className="block text-lg">
              Your Name
            </label>
            <input
              name="name"
              type="text"
              id="userName"
              value={userName}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-400"
            >
              Update Review
            </button>
          </div>
        </form>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UpdateReview;
