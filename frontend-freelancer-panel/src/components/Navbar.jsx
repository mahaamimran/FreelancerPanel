import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import AuthContext from "../context/AuthContext";
import Modal from "../components/ui/Modal";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="SkillConnect Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-black">
            <Link to="/jobs" className="hover:text-primary">
              Find Work
            </Link>
            {user && (
            <Link to="/active-jobs" className="hover:text-primary">
              Active Jobs
            </Link>
            )}
            <Link to="/about" className="hover:text-primary">
              About Us
            </Link>
            {user && (
              <Link to="/account" className="hover:text-primary">
                Account
              </Link>
            )}
          </nav>

          {/* User Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm font-medium text-black">
                  Welcome, {user.firstName}!
                </span>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm font-medium text-red-400 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-black hover:text-primary"
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
            className="md:hidden flex items-center text-black focus:outline-none"
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
          {isMobileMenuOpen && (
            <nav className="absolute top-16 left-0 w-full bg-white/90 backdrop-blur-md shadow-md md:hidden">
              <ul className="flex flex-col space-y-4 p-4">
                <li>
                  <Link
                    to="/jobs"
                    className="block text-sm font-medium text-black hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Find Work
                  </Link>
                </li>
                <li>
                  <Link
                    to="/active-jobs"
                    className="block text-sm font-medium text-black hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Active Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block text-sm font-medium text-black hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link
                      to="/account"
                      className="block text-sm font-medium text-black hover:text-primary"
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
                        className="block text-sm font-medium text-black hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log In
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block text-sm font-medium text-black hover:text-primary"
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
                      onClick={() => setIsModalOpen(true)}
                      className="block text-sm font-medium text-red-600 hover:underline"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Logout Confirmation"
        message="Are you sure you want to log out?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
