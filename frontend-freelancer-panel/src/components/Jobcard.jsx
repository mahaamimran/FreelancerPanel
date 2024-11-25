import React from "react";

const JobCard = ({ job }) => {
  console.log("Rendering Job:", job); // Log each job
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-dark">{job.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {job.preferredLocation || "Remote"} ·{" "}
        {job.budgetType === "Fixed"
          ? `$${job.budgetAmount}`
          : `$${job.hourlyRate}/hr`}{" "}
        · {job.experienceLevel} · {job.status}
      </p>
      {job.estimatedTime && (
        <p className="text-sm text-gray-600 mt-1">
          Estimated Time: {job.estimatedTime}
        </p>
      )}
      <p className="text-sm text-gray-500 mt-2">{job.description}</p>
    </div>
  );
};

export default JobCard;
