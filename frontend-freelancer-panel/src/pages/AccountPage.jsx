import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/userService";
import { fetchAppliedJobs } from "../services/proposalService";
import { Button } from "../components/ui/Button";
import { motion } from "framer-motion";

export default function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
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

        setProfile(profileData);
        setAppliedJobs(appliedJobsData);
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
      // Centered loading spinner
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Animated Header Section */}
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
          <p className="mt-4 text-lg text-gray-600">Manage your account and profile settings below.</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto mt-12 px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile Section */}
        <div className="bg-gray-50 shadow-lg rounded-lg p-8 w-full">
          <h2 className="text-xl font-bold text-secondary mb-4">Profile</h2>
          <h3 className="text-lg font-semibold text-secondary mb-2">Applied Jobs</h3>
          {appliedJobs.length > 0 ? (
            <ul className="space-y-4">
              {appliedJobs.map((job) => (
                <li
                  key={job.jobId}
                  className="p-4 bg-white shadow-md rounded-lg"
                >
                  <h4 className="text-lg font-bold">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.description}</p>
                  <div className="mt-4 flex justify-end gap-4">
                    <Button
                      content="Update"
                      className="bg-primary text-white px-4 py-2 rounded-lg"
                      onClick={() => window.location.replace(`/jobs/${job.jobId}/update-proposal`)}
                    />
                    <Button
                      content="Delete"
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => console.log("Delete proposal logic here")}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center">You haven't applied to any jobs yet.</p>
          )}
        </div>

        {/* Account Section */}
        <div className="bg-gray-50 shadow-lg rounded-lg p-8 w-full">
          <h2 className="text-xl font-bold text-secondary mb-4">Account</h2>
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
            content="Edit Account"
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-300"
            onClick={() => window.location.replace("/edit-profile")}
          />
        </div>
      </motion.div>
    </div>
  );
}
