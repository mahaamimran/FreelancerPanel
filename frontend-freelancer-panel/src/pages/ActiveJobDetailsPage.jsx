import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { fetchJobById } from "../services/jobService";
import { fetchSkills } from "../services/skillService";
import { Spinner } from "../components/ui/Spinner";
import EmailJobProvider from "../components/EmailJobProvider";
import TimeLeft from "../components/TimeLeft";
import Button from "../components/ui/Button";
import { FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaTools, FaUser } from "react-icons/fa";

const ActiveJobDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const [job, setJob] = useState(null);
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobData = await fetchJobById(id);
                const skillsData = await fetchSkills();
                setJob(jobData);
                setSkills(skillsData);
            } catch (err) {
                console.error("Error fetching job details:", err);
                setError("Failed to load job details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) return <Spinner />;
    if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

    const skillNames = job.requiredSkills.map((skillId) => {
        const skill = skills.find((s) => s._id === skillId);
        return skill ? skill.name : "Unknown Skill";
    });

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        } catch {
            return "Invalid Date";
        }
    };

    const handleSubmitWork = () => {
        navigate(`/active-jobs/${id}/submit-work`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 lg:p-12">
            <div className="bg-white shadow-md rounded-lg p-4 lg:p-12 mt-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    {/* Deadline and Timer in the Same Line */}
                    <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:gap-8">
                        <h2 className="text-6xl font-bold text-primary">
                            DEADLINE <span className="text-secondary">IN</span>
                        </h2>
                        <div className="text-3xl font-semibold text-secondary">
                            <TimeLeft deadline={job.deadline} />
                        </div>
                    </div>
                    <br />
                    {/* Job Title in Next Line */}
                    <h3 className="text-3xl font-semibold text-secondary uppercase mt-4">
                        {job.title}
                    </h3>
                </div>
                <br />
                {/* Compact Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Column: Job Details */}
                    <div>
                        <h2 className="text-xl font-bold text-secondary mb-4">Job Details</h2>
                        <div className="space-y-4">
                            {[
                                { icon: FaTools, label: "Description", value: job.description },
                                {
                                    icon: FaMoneyBillWave,
                                    label: "Budget",
                                    value: job.budgetType === "Hourly" ? `$${job.hourlyRate}/hour` : `$${job.budgetAmount}`,
                                },
                                { icon: FaClock, label: "Deadline", value: formatDate(job.deadline) },
                                { icon: FaMapMarkerAlt, label: "Location", value: job.preferredLocation || "Not specified" },
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

                        {/* Actions */}
                        <div className="mt-8">
                            <Button
                                content="Submit Work"
                                onClick={handleSubmitWork} 
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Right Column: Job Provider and Actions */}
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

                        {/* Email Job Provider */}
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
