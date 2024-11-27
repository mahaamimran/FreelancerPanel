import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchUserProposal } from "../services/proposalService"; // Use this service to check if a proposal exists
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

  const [job, setJob] = useState(null); // Job details
  const [hasApplied, setHasApplied] = useState(false); // Tracks if the user has applied
  const [profile, setProfile] = useState(null); // User profile
  const [error, setError] = useState(null); // Error state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch job details
        const jobData = await fetchJobById(jobId);
        setJob(jobData);

        // Check if the user has submitted a proposal for this job
        if (token) {
          try {
            const userProposal = await fetchUserProposal(jobId, token);
            setHasApplied(!!userProposal); // Set `hasApplied` to true if a proposal exists
          } catch (err) {
            if (err.response?.status === 404) {
              setHasApplied(false); // No proposal found
            } else {
              throw err; // Handle other errors
            }
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching job details or proposal:", err);
        setError("Failed to load job details or proposal.");
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [jobId, token]);

  // Render loading or error states
  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Render the job details page
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row gap-8 px-6 lg:px-12 mt-16">
      {/* Left Section */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-8 mt-10">
        <JobInfo
          title={job.title}
          createdAt={job.createdAt}
          description={job.description}
          requiredSkills={job.requiredSkills}
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
                onClick={() => window.location.replace(`/jobs/${jobId}/submit-proposal`)}
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
