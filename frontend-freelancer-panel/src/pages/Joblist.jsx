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
    <motion.div
      className="container mx-auto mt-20" // Added top margin to avoid bumping into the navbar
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
  );
};

export default JobList;
