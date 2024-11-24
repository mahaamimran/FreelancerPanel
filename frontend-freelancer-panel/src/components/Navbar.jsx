import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Import your logo

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex items-center justify-between mx-auto h-16 px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="SkillConnect Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 text-sm font-medium text-dark">
          <Link to="/find-talent" className="hover:text-primary">
            Find Talent
          </Link>
          <Link to="/find-work" className="hover:text-primary">
            Find Work
          </Link>
          <Link to="/about" className="hover:text-primary">
            About Us
          </Link>
          <Link to="/account" className="hover:text-primary">
            Account
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-sm font-medium text-dark hover:text-primary"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-secondary transition-all duration-300 ease-in-out transform scale-105 hover:scale-100 shadow-md hover:shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
