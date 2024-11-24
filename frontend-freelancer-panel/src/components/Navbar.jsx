import React from 'react';
import { Link } from 'react-router-dom';
import placeholderLogo from '../assets/react.svg';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={placeholderLogo} alt="SkillConnect Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-blue-600">SkillConnect</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li>
            <Link to="/find-talent" className="hover:text-blue-500">
              Find Talent
            </Link>
          </li>
          <li>
            <Link to="/find-work" className="hover:text-blue-500">
              Find Work
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/account" className="hover:text-blue-500">
              Account
            </Link>
          </li>
        </ul>

        {/* Authentication Links */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-500"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
