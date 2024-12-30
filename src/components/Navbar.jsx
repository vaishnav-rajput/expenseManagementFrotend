import React, { useSyncExternalStore } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearUser } from '../redux/slices/userSlice';
import axios from 'axios';

const Navbar = () => {
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

 function logoutUser(){
    axios.get("http://localhost:4000/logout", {withCredentials: true})
    .then(() => {
      dispatch(clearUser())
    })
    .catch((error) => console.error("error during logout", error))
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-gray-800 hover:text-blue-500">
            Home
          </Link>


          <div className="space-x-4">
            {user && 
              <Link
              to="/edit-profile"
              className='text-blue-500 hover:text-blue-700'
            >
              Profile
            </Link>}

            <Link
              to="/leaderboards"
              className='text-blue-500 hover:text-blue-700 transition'
            >
              Leaderboard
            </Link>

            {!user &&   
              <>            
              <Link
              to="/signup"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Signup
            </Link>
            <Link
              to="/"
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              Login
            </Link>
            </>
            }
            {user && 
              <button 
              onClick={() => logoutUser()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
               Logout
               </button>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
