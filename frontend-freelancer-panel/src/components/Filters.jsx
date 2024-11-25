import React, { useState, useEffect } from "react";
import { fetchSkills } from "../services/skillService";

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    budgetType: "",
    experienceLevel: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const getCategories = async () => {
      try {
        const skills = await fetchSkills();
        setCategories(skills); // Assuming API response is an array of skills
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...selectedFilters, [name]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      budgetType: "",
      experienceLevel: "",
      category: "",
    };
    setSelectedFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-dark">Filters</h2>
      <div className="mt-4 space-y-4">
        {/* Budget Type Filter */}
        <h3 className="text-sm font-medium text-gray-600">Budget Type</h3>
        <div className="space-y-2">
          <label className="block">
            <input
              type="radio"
              name="budgetType"
              value="Fixed"
              checked={selectedFilters.budgetType === "Fixed"}
              onChange={handleChange}
              className="mr-2"
            />
            Fixed
          </label>
          <label className="block">
            <input
              type="radio"
              name="budgetType"
              value="Hourly"
              checked={selectedFilters.budgetType === "Hourly"}
              onChange={handleChange}
              className="mr-2"
            />
            Hourly
          </label>
        </div>

        {/* Experience Level Filter */}
        <h3 className="text-sm font-medium text-gray-600">Experience Level</h3>
        <div className="space-y-2">
          <label className="block">
            <input
              type="radio"
              name="experienceLevel"
              value="Entry"
              checked={selectedFilters.experienceLevel === "Entry"}
              onChange={handleChange}
              className="mr-2"
            />
            Entry
          </label>
          <label className="block">
            <input
              type="radio"
              name="experienceLevel"
              value="Intermediate"
              checked={selectedFilters.experienceLevel === "Intermediate"}
              onChange={handleChange}
              className="mr-2"
            />
            Intermediate
          </label>
          <label className="block">
            <input
              type="radio"
              name="experienceLevel"
              value="Expert"
              checked={selectedFilters.experienceLevel === "Expert"}
              onChange={handleChange}
              className="mr-2"
            />
            Expert
          </label>
        </div>

        {/* Category Filter */}
        <h3 className="text-sm font-medium text-gray-600">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label className="block" key={category._id}>
              <input
                type="radio"
                name="category"
                value={category._id}
                checked={selectedFilters.category === category._id}
                onChange={handleChange}
                className="mr-2"
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      {/* Minimal Clear Filters Button */}
      <div className="mt-6 text-right">
        <button
          onClick={handleClearFilters}
          className="text-sm text-primary hover:underline"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
