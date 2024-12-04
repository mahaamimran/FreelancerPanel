import React, { useState } from "react";
import { Textarea } from "../components/ui/Textarea";
import { Select } from "../components/ui/Select";
import { Input } from "../components/ui/Input";
import { FileInput } from "../components/ui/FileInput";

const ProposalForm = ({
  initialValues = {},
  onSubmit,
  onDelete,
  isSubmitting = false,
  isEditing = false,
}) => {
  const [coverLetterText, setCoverLetterText] = useState(initialValues.coverLetterText || "");
  const [budgetType, setBudgetType] = useState(initialValues.budgetType || "Fixed");
  const [budgetAmount, setBudgetAmount] = useState(initialValues.budgetAmount || "");
  const [attachments, setAttachments] = useState(initialValues.attachments || []);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map((file) => ({
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }));
    setAttachments(fileData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!coverLetterText || coverLetterText.length < 10) {
      setError("Cover letter must be at least 10 characters long.");
      return;
    }

    if (!budgetAmount || isNaN(budgetAmount) || budgetAmount <= 0) {
      setError("Budget amount must be a positive number.");
      return;
    }

    setError(null);
    onSubmit({ budgetType, budgetAmount, coverLetterText, attachments });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <Textarea
        label="Proposal*"
        placeholder="Explain your experience and why you are the perfect fit for this job."
        value={coverLetterText}
        onChange={(e) => setCoverLetterText(e.target.value)}
        maxLength={800}
        error={
          coverLetterText.length > 0 && coverLetterText.length < 10
            ? "Cover letter must be at least 10 characters long."
            : null
        }
      />

      <Select
        label="Budget Type*"
        options={[
          { value: "Fixed", label: "Fixed" },
          { value: "Hourly", label: "Hourly" },
        ]}
        value={budgetType}
        onChange={(e) => setBudgetType(e.target.value)}
      />

      <Input
        label="Budget Amount*"
        type="number"
        placeholder="Enter your proposed budget"
        value={budgetAmount}
        onChange={(e) => setBudgetAmount(e.target.value)}
      />

      <FileInput label="Attachments (Optional)" onChange={handleFileChange} />

      <div className="space-y-4 mt-8">
        <button
          type="submit"
          className={`w-full bg-primary text-white font-bold py-4 rounded-lg text-xl transform transition-all duration-500 ease-in-out ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-dark"
          }`}
          disabled={isSubmitting}
        >
          {isEditing ? "Update Proposal" : "Submit Proposal"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onDelete}
            className="w-full bg-red-500 text-white font-bold py-4 rounded-lg text-xl transform transition-transform duration-300 hover:scale-105 hover:bg-red-600"
          >
            Delete Proposal
          </button>
        )}
      </div>
    </form>
  );
};

export default ProposalForm;
