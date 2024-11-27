import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitProposal } from "../services/proposalService";
import { fetchJobById } from "../services/jobService";
import AuthContext from "../context/AuthContext";
import { motion } from "framer-motion";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Select } from "../components/ui/Select";
import { FileInput } from "../components/ui/FileInput";

const SubmitProposalPage = () => {
  const { id: jobId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [coverLetterText, setCoverLetterText] = useState("");
  const [budgetType, setBudgetType] = useState("Fixed");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false); // Tracks form submission
  const [successMessage, setSuccessMessage] = useState(null); // Tracks success message

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map((file) => ({
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }));
    setAttachments(fileData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true); // Mark the form as submitted to trigger validation messages

    // Validation
    if (!coverLetterText || !budgetAmount) {
      setError("Please fill all required fields.");
      return;
    }

    if (isNaN(budgetAmount) || budgetAmount <= 0) {
      setError("Budget amount must be a positive number.");
      return;
    }

    const proposalData = {
      jobId,
      budgetType,
      budgetAmount,
      coverLetterText,
      attachments,
    };

    setIsLoading(true);
    setError(null);

    try {
      await submitProposal(proposalData, user.token);
      setSuccessMessage("Proposal submitted successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate(`/jobs/${jobId}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Animated Header Section */}
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
            Create the perfect proposal as{" "}
            <span className="font-bold">{jobDetails?.title}</span> for{" "}
            <span className="text-secondary cursor-pointer">
              {jobDetails?.jobProviderId?.firstName || "them"}
            </span>
          </p>
        </div>
      </motion.div>

      {/* Form Section */}
      <div className="container mx-auto mt-10 px-4 lg:px-0 grid lg:grid-cols-3 gap-8">
        {/* Form */}
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

          <form onSubmit={handleSubmit}>
            <Textarea
              label="Proposal *"
              placeholder="Explain your experience and why you are the perfect fit for this job."
              value={coverLetterText}
              onChange={(e) => setCoverLetterText(e.target.value)}
              maxLength={800}
              error={hasSubmitted && !coverLetterText && "This field is required."} // Show error only after submission attempt
            />

            <Select
              label="Budget Type *"
              options={[
                { value: "Fixed", label: "Fixed" },
                { value: "Hourly", label: "Hourly" },
              ]}
              value={budgetType}
              onChange={(e) => setBudgetType(e.target.value)}
            />

            <Input
              label="Budget Amount *"
              type="number"
              placeholder="Enter your proposed budget"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              error={
                hasSubmitted &&
                (!budgetAmount || budgetAmount <= 0) &&
                "Budget amount is required and must be positive."
              }
            />

            <FileInput label="Attachments (Optional)" onChange={handleFileChange} />

            <button
              type="submit"
              className="mt-6 w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition duration-300"
            >
              Submit Proposal
            </button>
          </form>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-blue-50 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-primary mb-4">Tips to Stand Out</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
            <li>Personalize your proposal to the job and provider.</li>
            <li>Highlight your relevant experience and achievements.</li>
            <li>Provide concrete examples or case studies of past work.</li>
            <li>Be concise, professional, and confident in your tone.</li>
            <li>Ensure your budget is competitive yet fair for your expertise.</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitProposalPage;
