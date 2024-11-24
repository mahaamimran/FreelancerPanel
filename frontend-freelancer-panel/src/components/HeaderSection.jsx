
import React from "react"
const HeaderSection = () => (
    <header className="bg-white py-10 shadow-md">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-dark">
          FIND NEW <span className="text-primary">WORK</span> TODAY
        </h1>
        <p className="text-gray-600 mt-2">
          Thousands of jobs in the computer, engineering, and technology sectors are waiting for you.
        </p>
  
        {/* Search Bar */}
        <SearchBar />
      </div>
    </header>
  );

  export default HeaderSection;