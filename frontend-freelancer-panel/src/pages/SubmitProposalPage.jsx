import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitProposal } from "../services/proposalService";
import { fetchJobById } from "../services/jobService";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";
import ProposalForm from "../components/ProposalForm";
import TipsToStandOut from "../components/TipsToStandOut";

const SubmitProposalPage = () => {
  const { id: jobId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await fetchJobById(jobId);
        setJobDetails(jobData);
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleSubmit = async (proposalData) => {
    try {
      await submitProposal({ ...proposalData, jobId }, user.token);
      setSuccessMessage("Proposal submitted successfully!");
      setTimeout(() => {
        navigate(`/jobs/${jobId}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white py-12"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-7xl font-bold text-secondary mt-16">
            SUBMIT A <span className="text-primary">PROPOSAL</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Create the perfect proposal for{" "}
            <span className="font-bold">{jobDetails?.title}</span>
          </p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto mt-10 px-4 lg:px-0 grid lg:grid-cols-3 gap-8">
        {/* Proposal Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg"
        >
          {successMessage && (
            <div className="mb-4 p-4 text-center bg-green-100 text-green-700 font-semibold rounded-lg">
              {successMessage}
            </div>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <ProposalForm onSubmit={handleSubmit} />
        </motion.div>

        {/* Tips Section */}
        <TipsToStandOut
          tips={[
            "Personalize your proposal to the job and provider.",
            "Highlight your relevant experience and achievements.",
            "Provide concrete examples or case studies of past work.",
            "Be concise, professional, and confident in your tone.",
            "Ensure your budget is competitive yet fair for your expertise.",
          ]}
        />
      </div>
    </div>
  );
};

export default SubmitProposalPage;
