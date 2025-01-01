import React from 'react';
import addIcon from '../../assets/add.png';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    Cookies.remove('auth_token'); 
    navigate('/login');
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
      : 'text-gray-600 hover:text-blue-600 transition-all';
  };

  return (
    <div className="w-full bg-white shadow-md py-4 px-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-10">
          <Link to="/admin/" className={`text-lg ${getLinkClass('/admin/')}`}>
            Headlines
          </Link>
          <Link to="/admin/posts" className={`text-lg ${getLinkClass('/admin/posts')}`}>
            Posts
          </Link>
          <Link to="/admin/trending" className={`text-lg ${getLinkClass('/admin/trending')}`}>
            Trending
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            to="/admin/post" 
            className='flex items-center'
          >
            <span className="flex items-center bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-500 transition-all duration-200"
            >Add New Post</span>
          </Link>

          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-red-600 hover:text-white py-2 px-4 rounded-md border border-red-600 hover:bg-red-500 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Navbar;
