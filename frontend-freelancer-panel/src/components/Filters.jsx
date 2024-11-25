import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    salary: "",
    experienceLevel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...selectedFilters, [name]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-dark">Filters</h2>
      <div className="mt-4 space-y-4">
        {/* Location Filter */}
        <h3 className="text-sm font-medium text-gray-600">Location</h3>
        <div className="space-y-2">
          <label className="block">
            <input
              type="radio"
              name="location"
              value="remote"
              onChange={handleChange}
              className="mr-2"
            />
            Remote job
          </label>
          <label className="block">
            <input
              type="radio"
              name="location"
              value="onsite"
              onChange={handleChange}
              className="mr-2"
            />
            On-site
          </label>
        </div>

        {/* Salary Filter */}
        <h3 className="text-sm font-medium text-gray-600">Salary</h3>
        <div className="space-y-2">
          <label className="block">
            <input
              type="radio"
              name="salary"
              value="30000"
              onChange={handleChange}
              className="mr-2"
            />
            &gt; 30,000
          </label>
          <label className="block">
            <input
              type="radio"
              name="salary"
              value="50000"
              onChange={handleChange}
              className="mr-2"
            />
            &gt; 50,000
          </label>
        </div>

        {/* Experience Filter */}
        <h3 className="text-sm font-medium text-gray-600">Experience</h3>
        <div className="space-y-2">
          <label className="block">
            <input
              type="radio"
              name="experienceLevel"
              value="entry"
              onChange={handleChange}
              className="mr-2"
            />
            Entry Level
          </label>
          <label className="block">
            <input
              type="radio"
              name="experienceLevel"
              value="intermediate"
              onChange={handleChange}
              className="mr-2"
            />
            Intermediate
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
