import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ReviewTable = ({ review,setReviews,reviews }) => {
  const { _id,  rating, year, url } = review;


  const handleDelete = _id => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://a10-game-review-server.vercel.app/addReview/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Review has been deleted.",
                icon: "success",
              });

              const remaining=reviews.filter(rev=>rev._id !==_id)
              setReviews(remaining)
            }
          });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="text-xl">
            <th>Photo</th>
            <th>Rating</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={url} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              <span className="badge badge-ghost badge-sx">{rating}/5</span>
            </td>
            <td>{year}</td>
            <div>
            <Link to={`/updateReview/${_id}`}>
                <button
                  className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-yellow-400"
                >
                  Update
                </button>
              </Link>
              <button
                onClick={()=>handleDelete(_id)}
                className="bg-red-500 ml-1 mt-5 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
