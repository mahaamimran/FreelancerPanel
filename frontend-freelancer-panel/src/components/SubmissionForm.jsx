import React, { useState } from "react";
import { FileInput } from "../components/ui/FileInput";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";

const SubmissionForm = ({
  initialValues = {},
  onSubmit,
  onDelete,
  isEditing = false,
  buttonClass,
}) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(initialValues.text || "");
  const [attachments, setAttachments] = useState(initialValues.attachments || []);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }));
    setAttachments(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("Both title and description are required.");
      return;
    }
    setError("");
    onSubmit({ title, text: description, attachments });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
          {error}
        </div>
      )}
      <Input
        type="text"
        placeholder="Enter the title of your submission"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
      />
      <Textarea
        label="Description"
        placeholder="Provide a detailed description of your work"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={1000}
      />
      <FileInput label="Attachments (Optional)" onChange={handleFileChange} />
      <div className="flex flex-col space-y-4">
        <Button
          type="submit"
          content={isEditing ? "Update Submission" : "Submit Work"}
          className={buttonClass || "w-full bg-primary hover:bg-primary-dark text-white"}
        />
        {isEditing && (
          <Button
            type="button"
            content="Delete Submission"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            onClick={onDelete}
          />
        )}
      </div>
    </form>
  );
};

export default SubmissionForm;
