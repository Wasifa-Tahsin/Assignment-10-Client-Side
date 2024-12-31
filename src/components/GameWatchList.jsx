import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const GameWatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Fetch watchlist data from the server
    fetch('https://a10-game-review-server.vercel.app/watchList')
      .then((res) => res.json())
      .then((data) => setWatchlist(data))
      .catch((error) => console.error('Error fetching watchlist:', error));
  }, []);

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="max-w-7xl mx-auto my-10 p-6 bg-gradient-to-b from-gray-50 to-gray-200 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
          My Watchlist <span className="text-gray-800">({watchlist.length})</span>
        </h1>

        {watchlist.length > 0 ? (
          <div className="overflow-x-auto shadow-md">
            <table className="table-auto w-full border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="border border-gray-300 px-6 py-4 text-left">#</th>
                  <th className="border border-gray-300 px-6 py-4 text-left">Game Title</th>
                  <th className="border border-gray-300 px-6 py-4 text-left">Genre</th>
                  <th className="border border-gray-300 px-6 py-4 text-left">Rating</th>
                  <th className="border border-gray-300 px-6 py-4 text-left">Year</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-purple-50 text-gray-800 text-sm leading-normal"
                  >
                    <td className="border border-gray-300 px-6 py-4 text-left">{index + 1}</td>
                    <td className="border border-gray-300 px-6 py-4">{item.title}</td>
                    <td className="border border-gray-300 px-6 py-4">{item.genres}</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">{item.rating}</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">{item.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-600">Your watchlist is empty.</p>
            <img
              src="https://via.placeholder.com/400x200?text=No+Games+Added"
              alt="Empty Watchlist"
              className="mx-auto mt-6"
            />
          </div>
        )}
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default GameWatchList;
