import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/userService";
import { fetchAppliedJobs } from "../services/proposalService";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";

export default function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [inProgressJobs, setInProgressJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error("User is not authenticated. Please log in.");
        }

        const profileData = await fetchUserProfile(token);
        const appliedJobsData = await fetchAppliedJobs(token);

        const open = appliedJobsData.filter((job) => job.status === "In Progress");
        const completed = appliedJobsData.filter((job) => job.status === "Completed");

        setProfile(profileData);
        setInProgressJobs(open);
        setCompletedJobs(completed);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch profile or applied jobs.");
      }
    };

    fetchData();
  }, [token]);

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl p-8 mt-16">
        <p className="text-center text-red-500">{error}</p>
        <Button
          content="Go to Login"
          className="mt-6 bg-primary hover:bg-secondary"
          onClick={() => window.location.replace("/login")}
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white py-12"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-secondary mt-16">
            YOUR <span className="text-primary">ACCOUNT</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Manage your profile and track your job applications below.
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-0 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-1 bg-gray-50 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold text-secondary mb-4">Profile</h2>
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-secondary">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-dark text-lg">{profile.email}</p>
            <p className="mt-2 text-sm text-primary font-semibold uppercase tracking-wide">
              {profile.role}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-secondary mb-2">Skills</h3>
            {profile.skills?.length > 0 ? (
              <ul className="grid grid-cols-2 gap-4">
                {profile.skills.map((skill) => (
                  <li
                    key={skill._id || skill}
                    className="text-sm text-white bg-secondary/90 px-4 py-3 rounded shadow"
                  >
                    {skill.name || skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No skills added yet.</p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-gray-100 rounded shadow-lg">
              <h3 className="text-2xl font-bold text-primary">{profile.totalEarnings ?? 0}</h3>
              <p className="text-dark text-sm">Total Earnings</p>
            </div>
            <div className="p-4 bg-gray-100 rounded shadow-lg">
              <h3 className="text-2xl font-bold text-primary">
                {profile.avgRating?.toFixed(1) || "N/A"}
              </h3>
              <p className="text-dark text-sm">Average Rating</p>
            </div>
          </div>

          <Button
            content="Edit Profile"
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300"
            onClick={() => window.location.replace("/edit-profile")}
          />
        </motion.div>

        {/* Jobs Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-2"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-bold text-secondary mb-4">In Progress Jobs</h2>
            {inProgressJobs.length > 0 ? (
              <ul className="space-y-4">
                {inProgressJobs.map((job) => (
                  <li key={job.jobId} className="p-4 bg-gray-50 rounded-lg shadow-md">
                    <h4 className="text-lg font-bold">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.description}</p>
                    <Button
                      content="View Proposal"
                      className="bg-primary text-white px-4 py-2 rounded-lg mt-4"
                      onClick={() => window.location.replace(`/jobs/${job.jobId}/update-proposal`)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No jobs in progress yet.</p>
            )}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-secondary mb-4">Completed Jobs</h2>
            {completedJobs.length > 0 ? (
              <ul className="space-y-4">
                {completedJobs.map((job) => (
                  <li key={job.jobId} className="p-4 bg-gray-50 rounded-lg shadow-md">
                    <h4 className="text-lg font-bold">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No completed jobs yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
