import React, { useState } from "react";

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
    <form className="mt-4" onSubmit={handleSearchSubmit}>
      <div className="flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search jobs..."
          className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="ml-2 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
