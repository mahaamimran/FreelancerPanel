import React, { useState } from "react";
import { BiSearch } from "react-icons/bi"; // Using react-icons for a search icon

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Call the parent handler with the search query
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for jobs..."
            className="w-full px-5 py-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-full hover:bg-secondary transition"
          >
            <div className="flex items-center space-x-1">
              <BiSearch className="h-5 w-5" />
              <span className="text-sm font-medium">Search</span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
