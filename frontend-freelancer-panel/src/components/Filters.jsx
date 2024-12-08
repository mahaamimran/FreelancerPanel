import React, { useState, useEffect } from "react";
import { fetchSkills } from "../services/skillService";

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    budgetType: "",
    experienceLevel: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 10; // Number of skills to display per page

  useEffect(() => {
    const getCategories = async () => {
      try {
        const skills = await fetchSkills();
        setCategories(skills);
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

  // Paginate Skills
  const startIndex = (currentPage - 1) * skillsPerPage;
  const paginatedSkills = categories.slice(startIndex, startIndex + skillsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && startIndex + skillsPerPage < categories.length) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-dark">Filters</h2>
      <div className="mt-4 space-y-4">
        {/* Budget Type Filter */}
        <h3 className="text-sm font-medium text-gray-600">Budget Type</h3>
        <div className="space-y-2">
          {["Fixed", "Hourly"].map((type) => (
            <label className="block" key={type}>
              <input
                type="radio"
                name="budgetType"
                value={type}
                checked={selectedFilters.budgetType === type}
                onChange={handleChange}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>

        {/* Experience Level Filter */}
        <h3 className="text-sm font-medium text-gray-600">Experience Level</h3>
        <div className="space-y-2">
          {["Entry", "Intermediate", "Expert"].map((level) => (
            <label className="block" key={level}>
              <input
                type="radio"
                name="experienceLevel"
                value={level}
                checked={selectedFilters.experienceLevel === level}
                onChange={handleChange}
                className="mr-2"
              />
              {level}
            </label>
          ))}
        </div>

        {/* Category (Paginated Skills) */}
        <h3 className="text-sm font-medium text-gray-600">Category</h3>
        <div className="space-y-2">
          {paginatedSkills.map((category) => (
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
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className={`text-sm px-4 py-2 rounded-lg ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-primary hover:underline"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange("next")}
            disabled={startIndex + skillsPerPage >= categories.length}
            className={`text-sm px-4 py-2 rounded-lg ${
              startIndex + skillsPerPage >= categories.length
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary hover:underline"
            }`}
          >
            Next
          </button>
        </div>
      </div>

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
