import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "../services/userService";
import { fetchSkills } from "../services/skillService";
import { Button } from "../components/ui/Button";
import TipsToStandOut from "../components/TipsToStandOut";
import { motion } from "framer-motion";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;

  const tips = [
    "Use a professional profile picture.",
    "Highlight your most relevant skills.",
    "Write a concise and engaging bio.",
    "Keep your profile updated regularly.",
    "Showcase your expertise with completed projects.",
    "Ask for recommendations from past clients.",
    "Respond to messages promptly.",
    "Be polite and professional in all interactions.",
    "Join relevant groups and communities.",
    "Participate in skill tests to showcase your abilities.",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserProfile(token);
        const skillsData = await fetchSkills();

        setProfile(userData);
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setBio(userData.bio || "");
        setSelectedSkills(userData.skills.map((skill) => skill._id));
        setSkills(skillsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [token]);

  const handleSkillChange = (id) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((skillId) => skillId !== id) : [...prev, id]
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await updateUserProfile(token, {
        firstName,
        lastName,
        bio,
        skills: selectedSkills,
      });

      setProfile(updatedProfile);
      setSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/account"), 2000); // Redirect to account page after 2 seconds
    } catch (err) {
      setError(err.message);
      setSuccess(""); // Clear success message on error
    }
  };

  if (!profile)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white py-12"
      >
        <div className="container mx-auto text-center py-16">
          <h1 className="text-6xl font-bold text-secondary">
            EDIT YOUR <span className="text-primary">PROFILE</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Update your details to stand out and attract more opportunities.
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-0 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg"
        >
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-lg p-3"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-lg p-3"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary sm:text-lg p-3"
                rows={4}
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill) => (
                  <label key={skill._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill._id)}
                      onChange={() => handleSkillChange(skill._id)}
                      className="form-checkbox h-5 w-5 text-primary"
                    />
                    <span className="text-gray-700 text-sm">{skill.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                content="Save Changes"
                className="w-full bg-primary py-3 text-lg"
                type="submit"
              />
            </div>
          </form>
        </motion.div>

        {/* Tips Section */}
        <TipsToStandOut tips={tips} />
      </div>
    </div>
  );
}
