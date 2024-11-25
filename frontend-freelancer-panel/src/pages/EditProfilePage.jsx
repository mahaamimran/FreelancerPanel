import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "../services/userService";
import { fetchSkills } from "../services/skillService"; // Use the correct skill service
import { Button } from "../components/ui/Button";

export default function EditProfilePage() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserProfile(token);
        const skillsData = await fetchSkills();

        setProfile(userData);
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
        bio,
        skills: selectedSkills,
      });

      setProfile(updatedProfile);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
      setSuccess(""); // Clear success message on error
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Edit Profile</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            rows={4}
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skills
          </label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              <label key={skill._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill._id)}
                  onChange={() => handleSkillChange(skill._id)}
                  className="form-checkbox h-5 w-5 text-primary"
                />
                <span className="text-gray-700">{skill.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button content="Save Changes" className="w-full bg-primary" type="submit" />
      </form>
    </div>
  );
}
