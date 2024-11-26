import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchUserProfile } from "../services/userService";
import { fetchSkills } from "../services/skillService"; // New import
import AuthContext from "../context/AuthContext";
import JobInfo from "../components/JobInfo";
import AboutJobProvider from "../components/AboutJobProvider";
import { LoggedInPanel, NonLoggedInPanel } from "../components/SidePanel";
import Button from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";

const JobDetails = () => {
  const { id } = useParams();
  const { token: contextToken } = useContext(AuthContext);
  const token =
    contextToken || JSON.parse(localStorage.getItem("user"))?.token;

  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [globalSkillsMap, setGlobalSkillsMap] = useState({}); // Global skills mapping
  const [jobRequiredSkills, setJobRequiredSkills] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log("[Debug] Fetching job details...");
        const jobData = await fetchJobById(id);
        console.log("[Debug] Job Data:", jobData);
        setJob(jobData);

        let userProfile = null;

        if (token) {
          console.log("[Debug] Fetching user profile...");
          userProfile = await fetchUserProfile(token);
          console.log("[Debug] User Profile:", userProfile);
          setProfile(userProfile);
        } else {
          console.log("[Debug] Token is missing.");
        }

        console.log("[Debug] Fetching global skills...");
        const globalSkills = await fetchSkills(); // Fetch global skill mappings
        const globalSkillsMapping = globalSkills.reduce((acc, skill) => {
          acc[skill._id] = skill.name;
          return acc;
        }, {});
        setGlobalSkillsMap(globalSkillsMapping);

        // Map job-required skills using global skill mapping
        const jobSkillsMapping = jobData.requiredSkills.reduce((acc, skillId) => {
          acc[skillId] = globalSkillsMapping[skillId] || "Unknown Skill";
          return acc;
        }, {});
        console.log("[Debug] Job Required Skills Map:", jobSkillsMapping);

        setJobRequiredSkills(jobSkillsMapping);
        setIsLoading(false);
      } catch (err) {
        console.error("[Error] Failed to fetch details:", err);
        setError("Failed to load job details or user profile.");
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, token]);

  const calculateSkillMatch = (job, profile) => {
    if (!job || !job.requiredSkills || !profile || !profile.skills) return 0;

    const userSkillIds = profile.skills.map((skill) => skill._id);
    const matchingSkillsCount = job.requiredSkills.filter((skillId) =>
      userSkillIds.includes(skillId)
    ).length;

    return Math.round(
      (matchingSkillsCount / job.requiredSkills.length) * 100
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row gap-8 px-6 lg:px-12 mt-24">
      {/* Left Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-8">
        <JobInfo
          title={job.title}
          createdAt={job.createdAt}
          description={job.description}
          requiredSkills={job.requiredSkills}
          skills={jobRequiredSkills} 
          location={job.preferredLocation}
          budgetType={job.budgetType}
          budgetAmount={job.budgetAmount}
        />
        <AboutJobProvider provider={job.jobProviderId} />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
        {profile ? (
          <>
            <LoggedInPanel
              matchPercentage={calculateSkillMatch(job, profile)}
            />
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Your Skills
              </h3>
              {profile.skills?.length > 0 ? (
                <ul className="grid grid-cols-2 gap-4">
                  {profile.skills.map((skill) => (
                    <li
                      key={skill._id}
                      className="text-sm text-white bg-secondary/90 px-4 py-2 rounded shadow"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
              )}
            </div>
            <div className="mt-6">
              <Button
                content="Submit Proposal"
                onClick={() => alert("Proposal submitted!")}
                className="w-full"
              />
            </div>
          </>
        ) : (
          <NonLoggedInPanel />
        )}
      </div>
    </div>
  );
};

export default JobDetails;
