import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Spinner } from "../components/ui/Spinner";
import { ValidationError } from "../components/ui/ValidationError";
import { motion } from "framer-motion";
import { createSubmission } from "../services/submissionService";
import { fetchJobById } from "../services/jobService";
import SubmissionForm from "../components/SubmissionForm";
import TipsToStandOut from "../components/TipsToStandOut";
import TimeLeft from "../components/TimeLeft";

const SubmissionPage = () => {
  const { user } = useContext(AuthContext);
  const { id: jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const tips = [
    "Keep your title short and descriptive.",
    "Provide a detailed description of your work.",
    "Attach relevant files to showcase your efforts.",
    "Ensure your submission is professional and complete.",
  ];

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const fetchedJob = await fetchJobById(jobId);
        if (!fetchedJob) {
          throw new Error("Job not found");
        }
        setJob(fetchedJob);
      } catch (error) {
        console.error("Error fetching job details:", error.message);
        setError(error.message || "Failed to fetch job details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (submissionData) => {
    if (!user?.token) {
      setError("You must be logged in to submit your work.");
      return;
    }

    try {
      setError("");
      await createSubmission({ ...submissionData, jobId });
      setSuccessMessage("Submission created successfully!");
      setTimeout(() => {
        navigate(`/active-jobs/${jobId}`);
      }, 2000);
    } catch (error) {
      console.error("Error creating submission:", error.message);
      setError(error.message || "Failed to create submission.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-20">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 text-center bg-green-100 text-green-700 font-semibold rounded-md"
        >
          {successMessage}
        </motion.div>
      )}

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white py-12"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-7xl font-bold text-secondary mt-16">
            SUBMIT YOUR <span className="text-primary">WORK</span>
          </h1>
          {job && (
            <p className="mt-4 text-xl text-gray-600">
              Submit your work for{" "}
              <span className="font-bold text-primary">{job.title}</span>
            </p>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto mt-10 px-4 lg:px-0 grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg"
        >
          {error && <ValidationError message={error} />}
          <SubmissionForm
            onSubmit={handleSubmit}
            isEditing={false}
            buttonClass="w-full bg-primary hover:bg-primary-dark" // Full-width buttons
          />
        </motion.div>

        {/* Tips Section */}
        <TipsToStandOut tips={tips} />
      </div>

      {/* Deadline Section */}
      <div className="mt-12">
        <h2 className="text-center text-3xl font-bold text-primary mb-4">Time Left</h2>
        {job?.deadline && <TimeLeft deadline={job.deadline} />}
      </div>
    </div>
  );
};

export default SubmissionPage;
