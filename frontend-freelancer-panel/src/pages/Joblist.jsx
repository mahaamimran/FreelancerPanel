import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Filters from "../components/Filters";
import JobContent from "../components/JobContent";
import { fetchJobs } from "../services/jobService";
import SearchBar from "../components/SearchBar";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await fetchJobs({ ...filters, status: "Open" });
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };
    getJobs();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchQuery) => {
    setFilters((prevFilters) => ({ ...prevFilters, search: searchQuery }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Animated Header Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white py-12"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-secondary mt-16">
            FIND THE PERFECT <span className="text-primary">JOB</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover opportunities and find the perfect job to match your skills.
          </p>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <motion.div
        className="container mx-auto mt-12 px-4 lg:px-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Search Bar */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
          key="search-bar" // Helps with reanimation when refreshed
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <main className="grid grid-cols-12 gap-8">
          {/* Filters Section */}
          <motion.aside
            className="col-span-3"
            variants={itemVariants}
            key="filters" // Key for animation reinitialization
          >
            <Filters onFilterChange={handleFilterChange} />
          </motion.aside>

          {/* Job Content Section */}
          <motion.section
            className="col-span-9"
            variants={itemVariants}
            key="job-content"
          >
            <JobContent
              jobs={jobs}
              currentPage={currentPage}
              jobsPerPage={5}
              onPageChange={handlePageChange}
            />
          </motion.section>
        </main>
      </motion.div>
    </div>
  );
};

export default JobList;
