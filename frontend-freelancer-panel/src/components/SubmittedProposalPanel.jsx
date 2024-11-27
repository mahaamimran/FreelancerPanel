import React from "react";
import { useNavigate } from "react-router-dom";

const SubmittedProposalPanel = ({ proposal, jobId }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-50 border rounded-lg shadow-md w-full">
      <h3 className="font-semibold text-lg text-gray-800 mb-4">You've Already Submitted a Proposal!</h3>
      <p className="text-gray-700">
        <strong>Cover Letter:</strong> {proposal.coverLetterText}
      </p>
      <p className="text-gray-700 mt-2">
        <strong>Budget:</strong>{" "}
        {proposal.budgetType === "Fixed"
          ? `$${proposal.budgetAmount}`
          : `$${proposal.budgetHourlyRate}/hr`}
      </p>
      <button
        onClick={() => navigate(`/jobs/${jobId}/edit-proposal`)}
        className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition w-full"
      >
        Edit Proposal
      </button>
    </div>
  );
};

export default SubmittedProposalPanel;
