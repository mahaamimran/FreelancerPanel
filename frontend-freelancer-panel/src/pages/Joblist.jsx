import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import HeaderSection from "../components/HeaderSection";
import { fetchJobs } from "../services/api";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({}); // Store selected filters
  const jobsPerPage = 5; // Number of jobs per page
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await fetchJobs(filters);
        console.log("Jobs Data:", jobsData);
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs in useEffect:", error);
        setJobs([]);
      }
    };
    getJobs();
  }, [filters]);
  
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="font-sans">
      <HeaderSection />
      <main className="container mx-auto mt-10 grid grid-cols-12 gap-8">
        <aside className="col-span-3">
          <Filters onFilterChange={handleFilterChange} />
        </aside>
        <section className="col-span-9">
          <h2 className="text-xl font-bold text-dark mb-4">
            {jobs.length} Jobs Found
          </h2>
          <div className="space-y-4">
            {jobs.length > 0 ? (
              currentJobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <div className="text-center text-gray-500 mt-10">
                <p className="text-lg font-medium">No jobs found.</p>
                <p className="text-sm">Try adjusting your filters or come back later.</p>
              </div>
            )}
          </div>
          {jobs.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>
    </div>
  );
  
};

export default JobList;
