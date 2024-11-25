import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import HeaderSection from "../components/HeaderSection";
import { fetchJobs } from "../services/jobService";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({}); // Store selected filters
  const jobsPerPage = 5;

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobsData = await fetchJobs({ ...filters, status: "Open" }); // Always filter by Open jobs
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
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
              totalPages={Math.ceil(jobs.length / jobsPerPage)}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default JobList;
