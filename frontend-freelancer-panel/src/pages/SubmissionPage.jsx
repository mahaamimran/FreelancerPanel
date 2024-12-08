import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FileInput } from "../components/ui/FileInput";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { ValidationError } from "../components/ui/ValidationError";
import TipsToStandOut from "../components/TipsToStandOut";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/Card";
import TimeLeft from "../components/TimeLeft";
import { createSubmission } from "../services/submissionService";
import { fetchJobById } from "../services/jobService";

const SubmissionPage = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const { id: jobId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState("");
  const [job, setJob] = useState(null);

  const deadline = job?.deadline || "2024-12-31T23:59:59"; // Default deadline if unavailable

  const tips = [
    "Keep your title short and descriptive.",
    "Provide a detailed description of your work.",
    "Attach relevant files to showcase your efforts.",
    "Ensure your submission is professional and complete.",
  ];

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const fetchedJob = await fetchJobById(jobId);
        setJob(fetchedJob);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to fetch job details.");
      }
    };

    fetchJob();
  }, [jobId]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }));
    setAttachments(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user?.token) {
      setError("You must be logged in to submit your work.");
      return;
    }

    if (!title || !description) {
      setError("Both title and description are required.");
      return;
    }

    try {
      await createSubmission({
        jobId,
        title,
        text: description,
        attachments,
      });

      alert("Submission created successfully!");
    } catch (error) {
      console.error("Error creating submission:", error.message);
      setError(error.message || "Failed to create submission.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-32 px-6 lg:px-12">
      {/* Banner */}
      <div className="container mx-auto text-center mb-8">
        <h1 className="text-6xl font-bold">
          <span className="text-primary">SUBMIT</span>{" "}
          <span className="text-secondary">YOUR WORK</span>
        </h1>
      </div>

      {/* Job Information */}
      <div className="container mx-auto mb-8 text-center">
        {job && (
          <h2 className="text-2xl font-bold text-primary">
            Submit your work for <span className="text-secondary">{job.title}</span> for {job.jobProviderId.firstName} {job.jobProviderId.lastName}
          </h2>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Submission Form</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <ValidationError message={error} />}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Enter the title of your submission"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                label="Description"
                placeholder="Provide a detailed description of your work"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1000}
              />
              <FileInput label="Attachments (Optional)" onChange={handleFileChange} />
              <Button content="Submit Work" type="submit" className="w-full" />
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <TipsToStandOut tips={tips} />
      </div>

      {/* Timer Reminder */}
      <div className="mt-12">
        <h2 className="text-center text-3xl font-bold text-primary mb-4">Deadline Reminder</h2>
        <TimeLeft deadline={deadline} />
      </div>
    </div>
  );
};

export default SubmissionPage;
