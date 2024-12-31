import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

import ReviewTable from "./ReviewTable";

const MyReviews = () => {
  const loadedReviews = useLoaderData();
  const [reviews,setReviews]=useState(loadedReviews)
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>

      <div className="max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
          All Reviews:{reviews.length}
        </h1>

        {
            reviews.map(review=><ReviewTable key={review._id} review={review} reviews={reviews} setReviews={setReviews} ></ReviewTable>)
        }
      </div>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MyReviews;
