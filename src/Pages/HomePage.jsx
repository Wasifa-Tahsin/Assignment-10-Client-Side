import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import AOS from 'aos';
import 'aos/dist/aos.css';
const HomePage = () => {
  const [highestRatedGames, setHighestRatedGames] = useState([]);
  const [index, setIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const slides = [
    {
      url: "https://media.istockphoto.com/id/1447239783/photo/young-teenager-plays-the-computer-and-celebrates-victory-in-video-game-with-a-clenched-fist.jpg?s=612x612&w=0&k=20&c=QQCtfS9UZNHYY5XScwAFPKA-KAKXr6bSK_W8RXlZgTE=",
      title: "Explore New Worlds",
      description: "Dive into immersive worlds with our latest game reviews. Discover epic adventures and unlock new experiences.",
      buttonText: "Discover More",
      
    },
    {
      url: "https://t4.ftcdn.net/jpg/03/20/70/67/360_F_320706748_9EHt2oP8NgekFXsM3INJtN7HhdRHOTJN.jpg",
      title: "Find Your Next Favorite Game",
      description: "Browse through hundreds of reviews to find your next favorite game. From action to RPGs, there's something for everyone.",
      buttonText: "Browse Reviews",
      
    },
    {
      url: "https://media.gettyimages.com/id/1397054568/photo/girl-plays-video-game-online-and-streaming-at-home.jpg?s=612x612&w=gi&k=20&c=h4AEef_UVy9tnbQN0c2QmqXn2e1t9dF28mKOKfMZ5iA=",
      title: "Join the Chill Gamer Community",
      description: "Connect with like-minded gamers, share your reviews, and explore the world of gaming together.",
      buttonText: "Join Us",
     
    },
  ];

  const nextSlide = () => {
    setIndex((index + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((index - 1 + slides.length) % slides.length);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://a10-game-review-server.vercel.app/sixReview");
      setHighestRatedGames(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const [voteResult, setVoteResult] = useState({
    action: 0,
    rpg: 0,
    adventure: 0,
    strategy: 0,
  });
  

  useEffect(() => {
      AOS.init({
        duration: 1000, // Animation duration (in ms)
        easing: 'ease-in-out', // Easing function
        offset: 100, // Offset (in px) before animation triggers
        delay: 0, // Delay (in ms)
      });
    }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="relative w-full max-w-screen-2xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4  dark:bg-gray-800">
          <h1 className="text-3xl font-bold">Game Hub</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">{darkMode ? "Dark Mode" : "Light Mode"}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={darkMode}
                onChange={handleThemeToggle}
              />
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-700 rounded-full peer dark:peer-checked:bg-yellow-500 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-yellow-500 transition-all"></div>
              <span
                className="absolute left-1 top-1 bg-white dark:bg-black w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"
              ></span>
            </label>
          </div>
        </header>

        {/* Hero Slider */}
        <div className="relative overflow-hidden rounded-lg shadow-lg mt-6">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="w-full flex-shrink-0 relative">
                <img
                  src={slide.url}
                  alt={`slide ${idx + 1}`}
                  className="w-full h-[500px] lg:h-[600px] object-cover rounded-lg shadow-xl transition-all transform hover:scale-105 hover:brightness-110"
                />
                <div className="absolute top-1/2 left-0 w-full text-center transform -translate-y-1/2 text-white px-4">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl mb-6">{slide.description}</p>
                  <Link
                    to={slide.link}
                    className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 bg-gray-800 text-white rounded-full opacity-50 hover:opacity-100 transition-all"
          >
            <span className="text-2xl">&#10094;</span>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 bg-gray-800 text-white rounded-full opacity-50 hover:opacity-100 transition-all"
          >
            <span className="text-2xl">&#10095;</span>
          </button>
        </div>

        {/* Highest Rated Games Section */}
        <div data-aos="fade-right" className="mt-12 mb-10 p-6 bg-gradient-to-r from-teal-200 to-blue-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-xl text-center">
          <Fade>
          <h2 className="text-4xl font-bold mb-6">Highest Rated Games</h2>
          </Fade>
          <p className="text-lg mb-8">Discover the top 6 highest-rated games based on player reviews!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {highestRatedGames.map((game) => (
    <div
      key={game._id}
      className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow-lg"
      data-tooltip-id="tooltip-anchor-hide"
      data-tooltip-content={`Title: ${game.title}, Rating: ${game.ratingNmbr}`}
      data-tooltip-delay-hide={1000}
    >
      <img
        src={game.url}
        alt={game.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <Fade>
        <h3 className="text-2xl font-semibold text-yellow-300">{game.title}</h3>
      </Fade>
      <p className="text-lg text-gray-300">{game.genres}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-yellow-400 text-xl font-bold">{game.ratingNmbr}/5</span>
        <Link
          to={`/exploreDetails/${game._id}`}
          className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400"
        >
          Explore Details
        </Link>
      </div>
    </div>
  ))}
  <Tooltip id="tooltip-anchor-hide" />
</div>


         
        </div>

        {/* Upcoming Games Section */}
        <div data-aos="fade-left" className="mt-12 mb-10 p-6 bg-gradient-to-r from-purple-200 to-pink-300 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-xl text-center">
         <Fade>
         <h2 className="text-4xl font-bold mb-6">Upcoming Game Releases</h2>
         </Fade>
          <p className="text-lg mb-8">Mark your calendars and stay ahead of the gaming curve!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-yellow-300">Game A</h3>
              <p className="text-lg text-gray-300">Release Date: 15th Jan, 2025</p>
              <p className="text-md text-gray-300">Genre: Action</p>
            </div>
            <div className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-yellow-300">Game B</h3>
              <p className="text-lg text-gray-300">Release Date: 22nd Jan, 2025</p>
              <p className="text-md text-gray-300">Genre: RPG</p>
            </div>
            <div className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-yellow-300">Game C</h3>
              <p className="text-lg text-gray-300">Release Date: 30th Jan, 2025</p>
              <p className="text-md text-gray-300">Genre: Adventure</p>
            </div>
          </div>
        </div>

        {/* Voting Section */}
<div data-aos="fade-zoom-in" className="mt-12 mb-10 p-6 bg-gradient-to-r from-green-100 to-blue-300 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-xl text-center">
 <Fade>
 <h2 className="text-4xl font-bold mb-6">What's Your Favorite Game Genre?</h2>
 </Fade>
  <p className="text-lg mb-8">Vote for your favorite game genre and see how others voted in real-time!</p>
  
  <div className="space-y-4">
    <button
      onClick={() => setVoteResult((prev) => ({ ...prev, action: prev.action + 1 }))}
      className="w-full bg-gray-800 dark:bg-gray-700 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-600"
    >
      Action
    </button>
    <button
      onClick={() => setVoteResult((prev) => ({ ...prev, rpg: prev.rpg + 1 }))}
      className="w-full bg-gray-800 dark:bg-gray-700 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-600"
    >
      RPG
    </button>
    <button
      onClick={() => setVoteResult((prev) => ({ ...prev, adventure: prev.adventure + 1 }))}
      className="w-full bg-gray-800 dark:bg-gray-700 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-600"
    >
      Adventure
    </button>
    <button
      onClick={() => setVoteResult((prev) => ({ ...prev, strategy: prev.strategy + 1 }))}
      className="w-full bg-gray-800 dark:bg-gray-700 text-white py-3 rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-600"
    >
      Strategy
    </button>
  </div>

  {/* Display results */}
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-4">Poll Results</h3>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Object.entries(voteResult).map(([genre, votes], idx) => (
        <div
          key={idx}
          className="p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg"
        >
          <h4 className="text-lg font-semibold capitalize">{genre}</h4>
          <div
            className="bg-gray-300 dark:bg-gray-600 h-4 rounded-full overflow-hidden"
          >
            <div
              className="bg-blue-500 h-4"
              style={{ width: `${(votes / 10) * 100}%` }}
            ></div>
          </div>
          <span className="block mt-2 text-sm">{votes} votes</span>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default HomePage;
