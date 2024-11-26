import React from "react";

const JobInfo = ({ title, createdAt, description, requiredSkills, skills }) => {
  return (
    <div className="space-y-8">
      {/* Job Header */}
      <div>
        <h1 className="text-4xl font-bold text-dark">{title}</h1>
        <p className="text-sm text-gray-600">
          Posted on {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Job Description */}
      <div>
        <h2 className="text-2xl font-semibold text-dark mb-4">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{description}</p>
      </div>

      {/* Required Skills */}
      {requiredSkills?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-dark mb-4">Required Skills</h2>
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
