import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchSkills } from "../services/skillService";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { LoggedInPanel, NonLoggedInPanel } from "../components/SidePanel";
import JobInfo from "../components/JobInfo";
import AboutJobProvider from "../components/AboutJobProvider";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // Use AuthContext
  const [job, setJob] = useState(null);
  const [skills, setSkills] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const jobData = await fetchJobById(id);
        const skillsData = await fetchSkills();
        const skillMap = skillsData.reduce((acc, skill) => {
          acc[skill._id] = skill.name;
          return acc;
        }, {});

        setJob(jobData);
        setSkills(skillMap);
      } catch (err) {
        setError("Failed to fetch job details.");
        console.error(err);
      }
    };

    getJobDetails();
  }, [id]);

  const calculateSkillMatch = (job, user) => {
    if (!job || !job.requiredSkills || !user || !user.skills) return 0;

    // Extract user skill IDs as a set for efficient lookup
    const userSkillSet = new Set(user.skills.map((skill) => skill._id));

    // Check if any of the job-required skills match user skills
    const hasMatchingSkill = job.requiredSkills.some((jobSkillId) =>
      userSkillSet.has(jobSkillId)
    );

    return hasMatchingSkill ? 100 : 0;
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex mt-20">
      {/* Left Section */}
      <div className="flex-1 bg-white shadow-md py-6 px-10 rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <JobInfo
            title={job.title}
            createdAt={job.createdAt}
            description={job.description}
            requiredSkills={job.requiredSkills}
            skills={skills}
          />
          <AboutJobProvider provider={job.jobProviderId} />
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="w-1/3 bg-gray-50 shadow-md p-6">
        {user ? (
          <LoggedInPanel matchPercentage={calculateSkillMatch(job, user)} />
        ) : (
          <NonLoggedInPanel />
        )}
      </div>
    </div>
  );
};

export default JobDetails;
