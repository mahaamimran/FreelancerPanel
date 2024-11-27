import React from "react";
import { useNavigate } from "react-router-dom";

const SubmittedProposalPanel = ({ proposal, jobId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Submitted Proposal</h3>
      <p className="text-gray-600 mb-2">
        <strong>Budget Type:</strong> {proposal.budgetType}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Budget Amount:</strong> {proposal.budgetAmount}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Cover Letter:</strong> {proposal.coverLetterText}
      </p>
      <button
        onClick={() => navigate(`/jobs/${jobId}/edit-proposal`)}
        className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition w-full"
      >
        Edit Proposal
      </button>
    </div>
  );
};

export default SubmittedProposalPanel;
