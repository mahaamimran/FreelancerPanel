import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSubmissionById, updateSubmission, deleteSubmission } from "../services/submissionService";
import { fetchJobById } from "../services/jobService";
import AuthContext from "../context/AuthContext";
import SubmissionForm from "../components/SubmissionForm";
import TipsToStandOut from "../components/TipsToStandOut";
import { motion } from "framer-motion";
import { Spinner } from "../components/ui/Spinner";
import Modal from "../components/ui/Modal";

const ViewSubmissionPage = () => {
  const { id: submissionId } = useParams(); // Use submission ID from URL
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!user || !user.token) {
          navigate("/login");
          return;
        }

        // Fetch submission details by submission ID
        const submissionData = await getSubmissionById(submissionId);
        setSubmission(submissionData);

        // Fetch job details linked to the submission
        const jobData = await fetchJobById(submissionData.jobId);
        setJobDetails(jobData);
      } catch (err) {
        console.error("Error fetching job or submission details:", err);
        setError("Failed to load job or submission details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [submissionId, user, navigate]);

  const handleUpdate = async (updatedSubmission) => {
    try {
      await updateSubmission(submissionId, updatedSubmission);
      setSuccessMessage("Submission updated successfully!");
      setTimeout(() => {
        navigate(`/active-jobs/${submission?.jobId}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = async () => {
    try {
      await deleteSubmission(submissionId);
      setSuccessMessage("Submission deleted successfully!");
      setIsModalOpen(false);
      setTimeout(() => {
        navigate(`/active-jobs/${submission?.jobId}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete submission.");
      setIsModalOpen(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Modal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this submission? This action cannot be undone."
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white py-12"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-7xl font-bold text-secondary mt-16">
            VIEW YOUR <span className="text-primary">SUBMISSION</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            View and update your submission for <span className="font-bold">{jobDetails?.title}</span>
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto mt-10 px-4 lg:px-0 grid lg:grid-cols-3 gap-8">
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
          <SubmissionForm
            initialValues={submission}
            onSubmit={handleUpdate}
            onDelete={openModal}
            isEditing={true}
          />
        </motion.div>

        {/* Tips Section */}
        <TipsToStandOut
          tips={[
            "Ensure your submission highlights all the key points of your work.",
            "Keep your attachments organized and relevant.",
            "Double-check your title and description for clarity and professionalism.",
            "Make sure your submission stands out with a concise yet detailed explanation.",
          ]}
        />
      </div>
    </div>
  );
};

export default ViewSubmissionPage;
