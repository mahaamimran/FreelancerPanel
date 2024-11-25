import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/jobs/${job._id}`); // Navigate to Job Details
  };

  return (
    <div
      className="p-6 bg-white rounded-lg shadow transition transform hover:scale-105 hover:bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
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
      <p className="text-sm text-gray-500 mt-2 line-clamp-3">
        {job.description}
      </p>
    </div>
  );
};

export default JobCard;
