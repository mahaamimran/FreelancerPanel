import React from "react";
import { MdLocationOn, MdAccessTime, MdAttachMoney } from "react-icons/md";

const JobInfo = ({
  title,
  createdAt,
  description,
  requiredSkills,
  skills,
  location,
  budgetType,
  budgetAmount,
}) => {
  return (
    <div>
      {/* Job Title and Date */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-dark">{title}</h1>
        <p className="text-sm text-gray-600">
          Posted on {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Job Details */}
      <div className="space-y-4">
        <p className="flex items-center text-gray-700">
          <MdLocationOn className="text-primary mr-2 h-6 w-6" />
          <span className="font-medium">{location || "Remote"}</span>
        </p>
        <p className="flex items-center text-gray-700">
          <MdAttachMoney className="text-primary mr-2 h-6 w-6" />
          <span className="font-medium">
            {budgetType === "Fixed"
              ? `Fixed: $${budgetAmount}`
              : `Hourly: $${budgetAmount}/hr`}
          </span>
        </p>
        <p className="flex items-center text-gray-700">
          <MdAccessTime className="text-primary mr-2 h-6 w-6" />
          <span className="font-medium">
            Deadline: {new Date(createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-dark mb-4">
          Job Description
        </h2>
        <p className="text-gray-700 whitespace-pre-line">{description}</p>
      </div>

      {/* Required Skills */}
      {requiredSkills?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-dark mb-4">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {requiredSkills.map((skillId, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
              >
                {skills[skillId] || "Unknown Skill"}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobInfo;
