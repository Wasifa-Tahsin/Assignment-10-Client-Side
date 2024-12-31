import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Swal from 'sweetalert2';

const ReviewDetails = () => {
  const review = useLoaderData();
  
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);

  const handleAddToWatchlist = () => {


    const watchlistData = {
        reviewId: review._id,
        title: review.title,
        url: review.url,
        description: review.description,
        rating: review.rating,
        genres: review.genres,
        year: review.year,
       
      };
   


    fetch('https://a10-game-review-server.vercel.app/watchList',{
        method: 'POST',
            headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(watchlistData),
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);

        if(data.insertedId){
     Swal.fire({
          title: 'Success!',
          text: `"${review.title}" has been added to your Watchlist.`,
          icon: 'success',
          confirmButtonText: 'Cool',
        });
        }
    })
    }

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="max-w-4xl mx-auto my-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-purple-600">
          Review Details
        </h1>
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
          <img
            src={review.url}
            alt={review.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h2 className="text-3xl font-bold mb-4">{review.title}</h2>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Description:</strong> {review.description}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Rating:</strong> {review.rating} / 5
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Genre:</strong> {review.genres}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Year:</strong> {review.year}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Reviewer:</strong> {review.name}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>Email:</strong> {review.email}
          </p>
          <button
            onClick={handleAddToWatchlist}
            disabled={isAddedToWatchlist}
            className={`mt-4 px-6 py-2 text-white rounded-lg ${
              isAddedToWatchlist
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-400'
            }`}
          >
            {isAddedToWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ReviewDetails;