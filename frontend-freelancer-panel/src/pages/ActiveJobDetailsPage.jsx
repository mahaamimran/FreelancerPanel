import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchSkills } from "../services/skillService";
import { getSubmissionsByJob } from "../services/submissionService";
import { Spinner } from "../components/ui/Spinner";
import EmailJobProvider from "../components/EmailJobProvider";
import TimeLeft from "../components/TimeLeft";
import Button from "../components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../components/ui/Card";
import { FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaTools, FaUser } from "react-icons/fa";

const ActiveJobDetailsPage = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [existingSubmission, setExistingSubmission] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job details
        const jobData = await fetchJobById(jobId);
        setJob(jobData);

        // Fetch skills
        const skillsData = await fetchSkills();
        setSkills(skillsData);

        // Fetch submissions for the job
        const submissions = await getSubmissionsByJob(jobId);

        // Get current user ID from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
          throw new Error("User not logged in or missing ID");
        }

        // Find submission for the current user
        const userSubmission = submissions.find(
          (submission) => submission.freelancerId._id === user._id
        );

        setExistingSubmission(userSubmission || null);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response?.status === 404) {
          setExistingSubmission(null); // Handle no submissions case
        } else {
          setError("Failed to load job details. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  const skillNames = job.requiredSkills.map((skillId) => {
    const skill = skills.find((s) => s._id === skillId);
    return skill ? skill.name : "Unknown Skill";
  });

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch {
      return "Invalid Date";
    }
  };

  const handleSubmitWork = () => {
    navigate(`/active-jobs/${jobId}/submit-work`);
  };

  const handleViewSubmission = () => {
    if (existingSubmission) {
      navigate(`/submissions/${existingSubmission._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-6 lg:px-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-7xl font-bold text-primary">
          DEADLINE <span className="text-secondary">IN</span>
        </h1>
        <div className="text-4xl font-semibold text-secondary mt-4">
          <TimeLeft deadline={job.deadline} />
        </div>
        <h3 className="text-3xl font-semibold text-secondary mt-6">
          {job.title}
        </h3>
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Job Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { icon: FaTools, label: "Description", value: job.description },
                {
                  icon: FaMoneyBillWave,
                  label: "Budget",
                  value:
                    job.budgetType === "Hourly"
                      ? `$${job.hourlyRate}/hour`
                      : `$${job.budgetAmount}`,
                },
                { icon: FaClock, label: "Deadline", value: formatDate(job.deadline) },
                {
                  icon: FaMapMarkerAlt,
                  label: "Location",
                  value: job.preferredLocation || "Not specified",
                },
                { icon: FaUser, label: "Experience Level", value: job.experienceLevel },
                {
                  icon: FaTools,
                  label: "Required Skills",
                  value: skillNames.length > 0 ? skillNames.join(", ") : "No skills specified",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <item.icon className="text-primary text-2xl" />
                  <div>
                    <h3 className="text-lg font-bold text-primary">{item.label}</h3>
                    <p className="text-gray-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              {existingSubmission ? (
                <Button
                  content="View Submission"
                  onClick={handleViewSubmission}
                  className="w-full bg-secondary hover:bg-secondary-dark text-white"
                />
              ) : (
                <Button
                  content="Submit Work"
                  onClick={handleSubmitWork}
                  className="w-full bg-primary hover:bg-primary-dark text-white"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Provider Section */}
        <Card>
          <CardHeader>
            <CardTitle>Job Provider</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: "Name", value: `${job.jobProviderId.firstName} ${job.jobProviderId.lastName}` },
                { label: "Email", value: job.jobProviderId.email },
              ].map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-bold text-primary">{item.label}</h3>
                  <p className="text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <EmailJobProvider email={job.jobProviderId.email} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActiveJobDetailsPage;
