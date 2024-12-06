import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserProposal, updateProposal, deleteProposal } from "../services/proposalService";
import { fetchJobById } from "../services/jobService";
import AuthContext from "../context/AuthContext";
import ProposalForm from "../components/ProposalForm";
import TipsToStandOut from "../components/TipsToStandOut";
import { motion } from "framer-motion";
import { Spinner } from "../components/ui/Spinner";
import Modal from "../components/ui/Modal";

const UpdateProposalPage = () => {
  const { jobId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [proposal, setProposal] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchDetails = async () => {
      if (user === null) return; // Wait until AuthContext initializes
      if (!user || !user.token) {
        navigate("/login");
        return;
      }

      try {
        const jobData = await fetchJobById(jobId);
        setJobDetails(jobData);

        const userProposal = await fetchUserProposal(jobId, user.token);
        setProposal(userProposal);
      } catch (err) {
        setError("Failed to load job or proposal details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [jobId, user, navigate]);

  const handleUpdate = async (updatedProposal) => {
    try {
      await updateProposal(proposal._id, { ...updatedProposal, jobId }, user.token);
      setSuccessMessage("Proposal updated successfully!");
      setTimeout(() => {
        navigate(`/jobs/${jobId}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = async () => {
    try {
      await deleteProposal(proposal._id, jobId, user.token);
      setSuccessMessage("Proposal deleted successfully!");
      setIsModalOpen(false); // Close modal
      setTimeout(() => {
        navigate(`/jobs/${jobId}`);
      }, 2000);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Proposal not found. It may have already been deleted.");
      } else {
        setError(err.response?.data?.message || "Failed to delete proposal.");
      }
      setIsModalOpen(false); // Close modal
    }
  };

  if (user === null || isLoading) return <><Spinner></Spinner></>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Modal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this proposal? This action cannot be undone."
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
            UPDATE YOUR <span className="text-primary">PROPOSAL</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Modify your proposal for <span className="font-bold">{jobDetails?.title}</span>
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
          <ProposalForm
            initialValues={proposal}
            onSubmit={handleUpdate}
            onDelete={openModal} // Trigger modal on delete
            isEditing={true}
          />
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

export default UpdateProposalPage;
