import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  // Handle logout
  const handleLogout = () => {
    logOut();
    navigate('/'); 
  };

  const links = (
    <>
      <div className="space-y-2 lg:space-y-0 lg:flex lg:space-x-4">
        <NavLink to="/" className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded-md">
          Home
        </NavLink>
        <NavLink to="/Reviews" className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded-md">
          All Reviews
        </NavLink>
        <NavLink to="/addReview" className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded-md">
          Add Review
        </NavLink>
        <NavLink to="/myReviews" className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded-md">
          My Reviews
        </NavLink>
        <NavLink to="/myWatchlist" className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded-md">
          Game WatchList
        </NavLink>
      </div>
    </>
  );

  return (
    <div>
      <div className="navbar bg-indigo-200">
        <div className="navbar-start">
          {/* Hamburger Menu (Mobile) */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          {/* Website Logo */}
          <Link to="/" className="btn btn-ghost text-xl">Chill Gamer</Link>
        </div>

        {/* Centered Navbar for Large Screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>

        {/* Right-side Login/Register Buttons or User Avatar */}
        <div className="navbar-end gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {/* User Avatar */}
              <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <img
                  src={user.photoURL || '/default-avatar.png'}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full cursor-pointer"
                />
                {showTooltip && (
                  <div className="absolute top-12 left-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-lg z-10">
                    {user.displayName || 'Anonymous'}
                  </div>
                )}
              </div>

              {/* Log Out Button */}
              <button className="btn btn-outline" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to="/auth/register">
                <button className="btn btn-secondary">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
