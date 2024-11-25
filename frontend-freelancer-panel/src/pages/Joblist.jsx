import React, { useState, useEffect } from "react";
import Filters from "../components/Filters";
import JobContent from "../components/JobContent";
import HeaderSection from "../components/HeaderSection";
import { fetchJobs } from "../services/jobService";

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

  return (
    <div className="font-sans">
      <HeaderSection onSearch={handleSearch} />
      <main className="container mx-auto mt-10 grid grid-cols-12 gap-8">
        <aside className="col-span-3">
          <Filters onFilterChange={handleFilterChange} />
        </aside>
        <section className="col-span-9">
          <JobContent
            jobs={jobs}
            currentPage={currentPage}
            jobsPerPage={5}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </div>
  );
};

export default JobList;
