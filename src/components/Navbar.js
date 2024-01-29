import React from 'react';
import { Link } from 'react-router-dom';
import logo from './resume logo.png'
const Navbar = () => {
  return (
    <nav className="px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
        <div>
          <img src={logo} width={48} alt="logo" />
        </div>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4 md:space-x-8">
          <Link to="/" className="text-gray-700 hover:opacity-80 md:text-lg ">
            Home
          </Link>
          <Link to="/" className="text-gray-700 hover:opacity-80 md:text-lg ">
            New Job
          </Link>
          <Link to="/" className="text-gray-700 hover:opacity-80 md:text-lg ">
            New Course
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;