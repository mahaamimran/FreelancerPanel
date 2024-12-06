import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { Spinner } from "../components/ui/Spinner";
import { motion } from "framer-motion";
import EmailJobProvider from "../components/EmailJobProvider";
import TimeLeft from "../components/TimeLeft";

const ActiveJobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await fetchJobById(id);
        setJob(jobData);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white py-28 shadow-md"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-secondary">
            Job You've <span className="text-primary">Applied To</span>
          </h1>
          <p className="mt-6 text-3xl font-semibold text-gray-700">{job.title}</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto mt-16 px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Job Details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-8 rounded-lg shadow-lg lg:col-span-2"
        >
          <h2 className="text-2xl font-bold text-secondary mb-6">Job Details</h2>

          {/* Highlighted Status */}
          <div className="p-5 bg-primary/20 text-primary rounded-md shadow-md mb-8">
            <p className="text-lg font-semibold">Status: {job.status}</p>
          </div>

          {/* Deadline Countdown */}
          <TimeLeft deadline={job.deadline} />

          <div className="space-y-6 mt-8">
            <div>
              <h3 className="text-lg font-semibold text-primary">Description:</h3>
              <p className="text-lg text-gray-800">{job.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Budget:</h3>
              <p className="text-lg text-gray-800">
                {job.budgetType === "Hourly" ? `$${job.hourlyRate}/hour` : `$${job.budgetAmount}`}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Deadline:</h3>
              <p className="text-lg text-gray-800">{new Date(job.deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Location:</h3>
              <p className="text-lg text-gray-800">{job.preferredLocation || "Not specified"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Experience Level:</h3>
              <p className="text-lg text-gray-800">{job.experienceLevel}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Required Skills:</h3>
              <p className="text-lg text-gray-800">
                {job.requiredSkills?.length > 0
                  ? job.requiredSkills.join(", ")
                  : "No skills specified"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Created At:</h3>
              <p className="text-lg text-gray-800">
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Job Provider Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-secondary mb-6">Job Provider</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-primary">Name:</h3>
              <p className="text-lg text-gray-800">
                {job.jobProviderId.firstName} {job.jobProviderId.lastName}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Email:</h3>
              <p className="text-lg text-gray-800">{job.jobProviderId.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary">Account Created:</h3>
              <p className="text-lg text-gray-800">
                {new Date(job.jobProviderId.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Email Job Provider */}
          <EmailJobProvider email={job.jobProviderId.email} />
        </motion.div>
      </div>
    </div>
  );
};

export default ActiveJobDetailsPage;
