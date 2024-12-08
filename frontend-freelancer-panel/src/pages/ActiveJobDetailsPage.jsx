import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById } from "../services/jobService";
import { fetchSkills } from "../services/skillService";
import { getSubmissionsByJob } from "../services/submissionService";
import { Spinner } from "../components/ui/Spinner";
import EmailJobProvider from "../components/EmailJobProvider";
import TimeLeft from "../components/TimeLeft";
import Button from "../components/ui/Button";
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
        <div className="min-h-screen bg-gray-50 p-6 lg:px-12">
            <div className="bg-white shadow-md rounded-lg p-4 lg:p-12 mt-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:gap-8">
                        <h2 className="text-6xl font-bold text-primary">
                            DEADLINE <span className="text-secondary">IN</span>
                        </h2>
                        <div className="text-3xl font-semibold text-secondary">
                            <TimeLeft deadline={job.deadline} />
                        </div>
                    </div>
                    <br />
                    <h3 className="text-3xl font-semibold text-secondary uppercase mt-4">
                        {job.title}
                    </h3>
                </div>
                <br />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-xl font-bold text-secondary mb-4">Job Details</h2>
                        <div className="space-y-4">
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
                                <div key={index}>
                                    <h3 className="text-md font-semibold text-primary flex items-center gap-2">
                                        <item.icon /> {item.label}:
                                    </h3>
                                    <p className="text-md text-gray-800">{item.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            {existingSubmission ? (
                                <Button
                                    content="View Submission"
                                    onClick={handleViewSubmission}
                                    className="w-full bg-secondary hover:bg-secondary-dark"
                                />
                            ) : (
                                <Button
                                    content="Submit Work"
                                    onClick={handleSubmitWork}
                                    className="w-full bg-primary hover:bg-primary-dark"
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-secondary mb-4">Job Provider</h2>
                        <div className="space-y-4">
                            {[
                                { label: "Name", value: `${job.jobProviderId.firstName} ${job.jobProviderId.lastName}` },
                                { label: "Email", value: job.jobProviderId.email },
                            ].map((item, index) => (
                                <div key={index}>
                                    <h3 className="text-md font-semibold text-primary">{item.label}:</h3>
                                    <p className="text-md text-gray-800">{item.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <EmailJobProvider email={job.jobProviderId.email} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveJobDetailsPage;
