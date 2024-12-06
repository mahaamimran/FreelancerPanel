import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchSkills } from "../services/skillService";
import { Spinner } from "../components/ui/Spinner";
import { motion } from "framer-motion";
import EmailJobProvider from "../components/EmailJobProvider";
import TimeLeft from "../components/TimeLeft";
import { FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaTools, FaUser } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";

const ActiveJobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobData = await fetchJobById(id);
        const skillsData = await fetchSkills();
        setJob(jobData);
        setSkills(skillsData);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  const skillNames = job.requiredSkills.map((skillId) => {
    const skill = skills.find((s) => s._id === skillId);
    return skill ? skill.name : "Unknown Skill";
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white pt-24 pb-8 shadow-sm"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-secondary">
            Job You've <span className="text-primary">Applied To</span>
          </h1>
          <p className="mt-4 text-xl font-semibold text-gray-700">{job.title}</p>
        </div>
      </motion.div>

      {/* Countdown Timer */}
      <div className="py-8 bg-gray-100">
        <div className="container mx-auto flex justify-center">
          <TimeLeft deadline={job.deadline} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Job Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-secondary mb-6">Job Details</h2>

          {/* Highlighted Status */}
          <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md shadow-md mb-8 flex items-center gap-3">
            <AiOutlineCheckCircle className="text-2xl" />
            <p className="text-lg font-semibold">Status: {job.status}</p>
          </div>

          <div className="space-y-6">
            {[
              { icon: FaTools, label: "Description", value: job.description },
              {
                icon: FaMoneyBillWave,
                label: "Budget",
                value: job.budgetType === "Hourly" ? `$${job.hourlyRate}/hour` : `$${job.budgetAmount}`,
              },
              { icon: FaClock, label: "Deadline", value: new Date(job.deadline).toLocaleDateString() },
              { icon: FaMapMarkerAlt, label: "Location", value: job.preferredLocation || "Not specified" },
              { icon: FaUser, label: "Experience Level", value: job.experienceLevel },
              {
                icon: FaTools,
                label: "Required Skills",
                value: skillNames.length > 0 ? skillNames.join(", ") : "No skills specified",
              },
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <item.icon /> {item.label}:
                </h3>
                <p className="text-lg text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Mark as Done Button */}
          <div className="mt-8">
            <button className="w-full py-4 text-lg font-bold bg-primary hover:bg-secondary text-white shadow-lg rounded-md transition-all duration-300">
              Mark as Done
            </button>
          </div>
        </motion.div>

        {/* Job Provider Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-secondary mb-6">Job Provider</h2>
          <div className="space-y-4">
            {[
              { label: "Name", value: `${job.jobProviderId.firstName} ${job.jobProviderId.lastName}` },
              { label: "Email", value: job.jobProviderId.email },
              {
                label: "Account Created",
                value: new Date(job.jobProviderId.createdAt).toLocaleDateString(),
              },
            ].map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-primary">{item.label}:</h3>
                <p className="text-lg text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Email Job Provider */}
          <div className="mt-6">
            <EmailJobProvider email={job.jobProviderId.email} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActiveJobDetailsPage;
