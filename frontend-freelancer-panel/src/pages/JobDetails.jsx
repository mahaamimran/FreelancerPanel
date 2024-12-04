// src/pages/JobDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchSkills } from "../services/skillService"; // Fetch skills here
import { fetchUserProposal } from "../services/proposalService";
import AuthContext from "../context/AuthContext";
import JobInfo from "../components/JobInfo";
import AboutJobProvider from "../components/AboutJobProvider";
import { LoggedInPanel, NonLoggedInPanel } from "../components/SidePanel";
import { Spinner } from "../components/ui/Spinner";
import { Button } from "../components/ui/Button";

const JobDetails = () => {
  const { id: jobId } = useParams();
  const { token: contextToken } = useContext(AuthContext);
  const token = contextToken || JSON.parse(localStorage.getItem("user"))?.token;

  const [job, setJob] = useState(null);
  const [skillsMap, setSkillsMap] = useState({});
  const [hasApplied, setHasApplied] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch job details
        const jobData = await fetchJobById(jobId);
        setJob(jobData);

        // Fetch all skills and create a mapping
        const skills = await fetchSkills();
        const mapping = {};
        skills.forEach((skill) => {
          mapping[skill._id] = skill.name;
        });
        setSkillsMap(mapping);

        // Check if the user has submitted a proposal for this job
        if (token) {
          try {
            const userProposal = await fetchUserProposal(jobId, token);
            setHasApplied(!!userProposal);
          } catch (err) {
            if (err.response?.status === 404) {
              setHasApplied(false);
            } else {
              throw err;
            }
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching job details or skills:", err);
        setError("Failed to load job details or skills.");
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [jobId, token]);

  // Render loading or error states
  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row gap-8 px-6 lg:px-12 mt-16">
      {/* Left Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-8 mt-10">
        <JobInfo
          title={job.title}
          createdAt={job.createdAt}
          description={job.description}
          requiredSkills={job.requiredSkills}
          skillsMap={skillsMap} // Pass the skills mapping here
          location={job.preferredLocation}
          budgetType={job.budgetType}
          budgetAmount={job.budgetAmount}
        />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 flex flex-col gap-y-6 items-start bg-white shadow-md rounded-lg p-6 mt-10">
        <AboutJobProvider provider={job.jobProviderId} />

        {token ? (
          <>
            <LoggedInPanel matchPercentage={profile?.matchPercentage || 0} />
            {hasApplied ? (
              <>
                <p className="text-center text-red-500 font-semibold">
                  We've received your proposal for this job and are waiting for the job provider's response.
                </p>
                <Button
                  content="Update Proposal"
                  onClick={() => window.location.replace(`/jobs/${jobId}/update-proposal`)}
                  className="w-full text-2xl py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300"
                />
              </>
            ) : (
              <Button
                content="Apply Now"
                onClick={() => window.location.replace(`/jobs/${jobId}/submit-proposal`)}
                className="w-full text-2xl py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300"
              />
            )}
          </>
        ) : (
          <NonLoggedInPanel />
        )}
      </div>
    </div>
  );
};

export default JobDetails;
