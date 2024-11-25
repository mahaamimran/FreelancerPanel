import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import classNames from "classnames";
import AuthContext from "../context/AuthContext";
import Modal from "../components/Modal";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFadedIn, setIsFadedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const timer = setTimeout(() => setIsFadedIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLogoutConfirm = () => {
    logout();
    setIsModalOpen(false); // Close the modal after logout
  };

  return (
    <>
      <header
        className={classNames(
          "sticky top-0 z-50 w-full border-b transition-opacity duration-1000 ease-in-out backdrop-blur-md bg-white/70", // Translucent and glossy effect
          isFadedIn ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="SkillConnect Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-800">
            <Link to="/find-talent" className="hover:text-primary">
              Find Talent
            </Link>
            <Link to="/jobs" className="hover:text-primary">
              Find Work
            </Link>

            <Link to="/about" className="hover:text-primary">
              About Us
            </Link>
            {user && (
              <Link to="/account" className="hover:text-primary">
                Account
              </Link>
            )}
          </nav>

          {/* User Greeting or Authentication Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {user.name}!
                </span>
                <button
                  onClick={() => setIsModalOpen(true)} // Open the modal
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-secondary transition-all duration-300 ease-in-out transform scale-105 hover:scale-100 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden flex items-center text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile Menu */}
          <nav
            className={classNames(
              "absolute top-16 left-0 w-full bg-white/90 backdrop-blur-md shadow-md md:hidden transform transition-all duration-300",
              isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <Link
                  to="/find-talent"
                  className="block text-sm font-medium text-gray-800 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Talent
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="block text-sm font-medium text-gray-800 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Work
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block text-sm font-medium text-gray-800 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    to="/account"
                    className="block text-sm font-medium text-gray-800 hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                </li>
              )}
              {!user && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block text-sm font-medium text-gray-800 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="block text-sm font-medium text-gray-800 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <li>
                  <button
                    onClick={() => setIsModalOpen(true)} // Open the modal
                    className="block text-sm font-medium text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Logout Confirmation"
        message="Are you sure you want to log out?"
        onClose={() => setIsModalOpen(false)} // Close the modal
        onConfirm={handleLogoutConfirm} // Confirm logout
      />
    </>
  );
}
