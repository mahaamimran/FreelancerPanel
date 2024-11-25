import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchSkills } from "../services/skillService";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);
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

    const calculateSkillMatch = () => {
        if (!job || !job.requiredSkills || !user || !user.skills) return 0;

        const jobSkillNames = job.requiredSkills.map((skillId) => skills[skillId]);
        const matchingSkills = jobSkillNames.filter((skill) =>
            user.skills.includes(skill)
        );
        const matchPercentage =
            (matchingSkills.length / jobSkillNames.length) * 100;

        return Math.round(matchPercentage);
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
        <div className="min-h-screen bg-gray-100 flex mt-16"> {/* Added margin-top */}
            {/* Left Section */}
            <div className="flex-1 bg-white shadow-md py-6 px-10 rounded-lg">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <h1 className="text-4xl font-bold text-dark">{job.title}</h1>
                    <p className="text-sm text-gray-600">
                        Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </p>

                    {/* Job Description */}
                    <div>
                        <h2 className="text-2xl font-semibold text-dark mb-4">
                            Job Description
                        </h2>
                        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                    </div>

                    {/* Required Skills */}
                    {job.requiredSkills?.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-dark mb-4">
                                Required Skills
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {job.requiredSkills.map((skillId, index) => (
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

                    {/* Job Details */}
                    <div>
                        <h2 className="text-2xl font-semibold text-dark mb-4">
                            Job Details
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <span className="font-bold text-gray-700">Budget:</span>{" "}
                                {job.budgetType === "Fixed"
                                    ? `$${job.budgetAmount}`
                                    : `$${job.hourlyRate}/hour`}
                            </li>
                            <li>
                                <span className="font-bold text-gray-700">Estimated Time:</span>{" "}
                                {job.estimatedTime}
                            </li>
                            <li>
                                <span className="font-bold text-gray-700">Deadline:</span>{" "}
                                {new Date(job.deadline).toLocaleDateString()}
                            </li>
                            <li>
                                <span className="font-bold text-gray-700">
                                    Experience Level:
                                </span>{" "}
                                {job.experienceLevel}
                            </li>
                            <li>
                                <span className="font-bold text-gray-700">
                                    Preferred Location:
                                </span>{" "}
                                {job.preferredLocation || "No preference"}
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>

            {/* Right Panel */}
            <div className="w-1/3 bg-gray-50 shadow-md p-6">
                {isAuthenticated ? (
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Profile Match
                        </h3>
                        <div className="relative w-full bg-gray-200 rounded-full h-6">
                            <div
                                className="bg-primary h-6 rounded-full"
                                style={{ width: `${calculateSkillMatch()}%` }}
                            ></div>
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-800">
                                {calculateSkillMatch()}% Match
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-200 rounded-lg p-4 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Sign up to view more details!
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Log in to see how your profile matches this job and submit a
                            proposal.
                        </p>
                        <button
                            className="bg-primary text-white py-2 px-4 rounded-lg mt-4 hover:bg-primary-dark transition"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDetails;
