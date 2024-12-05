import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchSkills } from "../services/skillService";
import { fetchUserProposal } from "../services/proposalService";
import { fetchUserProfile } from "../services/userService";
import AuthContext from "../context/AuthContext";
import JobInfo from "../components/JobInfo";
import AboutJobProvider from "../components/AboutJobProvider";
import { LoggedInPanel, NonLoggedInPanel } from "../components/SidePanel";
import { Spinner } from "../components/ui/Spinner";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";

const JobDetails = () => {
  const { id: jobId } = useParams();
  const { token: contextToken } = useContext(AuthContext);
  const token = contextToken || JSON.parse(localStorage.getItem("user"))?.token;

  const [job, setJob] = useState(null);
  const [skillsMap, setSkillsMap] = useState({});
  const [hasApplied, setHasApplied] = useState(false);
  const [profile, setProfile] = useState(null);
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const jobData = await fetchJobById(jobId);
        setJob(jobData);

        const skills = await fetchSkills();
        const mapping = {};
        skills.forEach((skill) => {
          mapping[skill._id] = skill.name;
        });
        setSkillsMap(mapping);

        if (token) {
          const userProfile = await fetchUserProfile(token);
          setProfile(userProfile);

          const userSkillIds = userProfile.skills.map((skill) =>
            typeof skill === "string" ? skill : skill._id
          );
          const requiredSkillIds = jobData.requiredSkills || [];
          const matchedSkills = requiredSkillIds.filter((id) =>
            userSkillIds.includes(id)
          );
          const percentage =
            requiredSkillIds.length > 0
              ? (matchedSkills.length / requiredSkillIds.length) * 100
              : 0;
          setMatchPercentage(Math.round(percentage));
        }

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

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white py-12"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-secondary mt-16">
            JOB <span className="text-primary">DETAILS</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore the requirements and opportunities for this job.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto mt-12 px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Section */}
        <motion.div
          className="lg:col-span-8 bg-white p-8 rounded-lg shadow-lg"

          transition={{ duration: 0.3 }}
        >
          <JobInfo
            title={job.title}
            createdAt={job.createdAt}
            description={job.description}
            requiredSkills={job.requiredSkills}
            skillsMap={skillsMap}
            location={job.preferredLocation}
            budgetType={job.budgetType}
            budgetAmount={job.budgetAmount}
          />
        </motion.div>

        {/* Right Section */}
 {/* Right Section */}
<motion.div
  className="lg:col-span-4 bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-6"

  transition={{ duration: 0.3 }}
>
  <AboutJobProvider provider={job.jobProviderId} />

  {token ? (
    <>
      {/* Ensure spacing between panels */}
      <div className="space-y-4">
        <LoggedInPanel matchPercentage={matchPercentage} />
        {hasApplied ? (
          <>
            <p className="text-center text-red-500 font-semibold">
              We've received your proposal for this job and are waiting for the job provider's response.
            </p>
            <Button
              content="Update Proposal"
              onClick={() =>
                window.location.replace(`/jobs/${jobId}/update-proposal`)
              }
              className="w-full text-2xl py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300"
            />
          </>
        ) : (
          <Button
            content="Apply Now"
            onClick={() =>
              window.location.replace(`/jobs/${jobId}/submit-proposal`)
            }
            className="w-full text-2xl py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300"
          />
        )}
      </div>
    </>
  ) : (
    <NonLoggedInPanel />
  )}
</motion.div>

      </motion.div>
    </div>
  );
};

export default JobDetails;
