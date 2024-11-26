import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchUserProfile } from "../services/userService";
import { fetchSkills } from "../services/skillService";
import AuthContext from "../context/AuthContext";
import JobInfo from "../components/JobInfo";
import AboutJobProvider from "../components/AboutJobProvider";
import { LoggedInPanel, NonLoggedInPanel } from "../components/SidePanel";
import { Spinner } from "../components/ui/Spinner";
import { Button } from "../components/ui/Button";

const JobDetails = () => {
  const { id } = useParams();
  const { token: contextToken } = useContext(AuthContext);
  const token = contextToken || JSON.parse(localStorage.getItem("user"))?.token;

  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobRequiredSkills, setJobRequiredSkills] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const jobData = await fetchJobById(id);
        setJob(jobData);

        let userProfile = null;
        if (token) {
          userProfile = await fetchUserProfile(token);
          setProfile(userProfile);
        }

        const globalSkills = await fetchSkills();
        const globalSkillsMapping = globalSkills.reduce((acc, skill) => {
          acc[skill._id] = skill.name;
          return acc;
        }, {});

        const jobSkillsMapping = jobData.requiredSkills.reduce((acc, skillId) => {
          acc[skillId] = globalSkillsMapping[skillId] || "Unknown Skill";
          return acc;
        }, {});
        setJobRequiredSkills(jobSkillsMapping);

        setIsLoading(false);
      } catch (err) {
        setError("Failed to load job details or user profile.");
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, token]);

  const calculateSkillMatch = (job, profile) => {
    if (!job?.requiredSkills || !profile?.skills) return 0;

    const userSkillIds = profile.skills.map((skill) => skill._id);
    const matchingSkillsCount = job.requiredSkills.filter((skillId) =>
      userSkillIds.includes(skillId)
    ).length;

    return Math.round((matchingSkillsCount / job.requiredSkills.length) * 100);
  };

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
          skills={jobRequiredSkills}
          location={job.preferredLocation}
          budgetType={job.budgetType}
          budgetAmount={job.budgetAmount}
        />
        <AboutJobProvider provider={job.jobProviderId} />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6 mt-10">
        {profile ? (
          <>
            <LoggedInPanel matchPercentage={calculateSkillMatch(job, profile)} />
            <Button
              content="Apply Now"
              onClick={() => alert("Application Submitted!")}
              className="w-full text-2xl py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 ease-in-out transform scale-105 hover:scale-100 shadow-md hover:shadow-lg mt-4"
              style={{
                transition: "box-shadow 0.3s ease-in-out",
              }}
            />

          </>
        ) : (
          <NonLoggedInPanel />
        )}
      </div>
    </div>
  );
};

export default JobDetails;
