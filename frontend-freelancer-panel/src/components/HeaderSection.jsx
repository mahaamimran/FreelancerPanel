import React from "react";

const HeaderSection = ({ onSearch }) => (
  <header className="bg-white py-20 shadow-md">
    <div className="container mx-auto text-center">
      {/* Heading */}
      <h1 className="text-6xl font-extrabold text-dark leading-tight">
        FIND NEW <span className="text-primary">WORK</span> TODAY
      </h1>
      {/* Subtitle */}
      <p className="text-gray-600 mt-4 text-lg">
        Discover thousands of opportunities in computer, engineering, and technology fields, waiting just for you.
      </p>

      {/* Search Bar (optional) */}
      {onSearch && (
        <div className="mt-10 max-w-3xl mx-auto">
          <SearchBar onSearch={onSearch} />
        </div>
      )}
    </div>
  </header>
);

export default HeaderSection;
