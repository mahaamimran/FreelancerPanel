import React from "react";
import JobCard from "./Jobcard";
import Pagination from "./Pagination";

const JobContent = ({ jobs, currentPage, jobsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div>
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
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default JobContent;
