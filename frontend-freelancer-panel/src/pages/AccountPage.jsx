import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/userService";
import { Button } from "../components/ui/Button";
import classNames from "classnames";

export default function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isFadedIn, setIsFadedIn] = useState(false); // Animation state
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          throw new Error("User is not authenticated. Please log in.");
        }

        const data = await fetchUserProfile(token);

        // Ensure the data has expected structure
        if (!data || typeof data !== "object") {
          throw new Error("Unexpected response format from the server.");
        }

        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message || "Failed to fetch profile.");
      }
    };

    fetchProfile();

    // Fade-in animation trigger
    const fadeTimer = setTimeout(() => setIsFadedIn(true), 100);
    return () => clearTimeout(fadeTimer);
  }, [token]);

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl p-8">
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
      // centered loading spinner
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "container mx-auto max-w-4xl p-8 transition-opacity duration-1000 ease-in-out",
        isFadedIn ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 mt-12">
        {/* Name and Email */}
        <h1 className="text-3xl font-bold text-secondary">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="text-dark text-lg">{profile.email}</p>

        {/* Role */}
        <p className="mt-2 text-sm text-primary font-semibold uppercase tracking-wide">
          {profile.role}
        </p>

        {/* Bio */}
        {profile.bio ? (
          <p className="mt-6 text-center text-dark text-lg">{profile.bio}</p>
        ) : (
          <p className="mt-6 text-center text-gray-400 text-lg">
            No bio provided.
          </p>
        )}

        {/* Skills */}
        <div className="mt-8 w-full">
          <h2 className="text-xl font-semibold text-secondary">Skills</h2>
          {profile.skills?.length > 0 ? (
            <ul className="mt-4 grid grid-cols-2 gap-4">
              {profile.skills.map((skill) => (
                <li
                  key={skill._id || skill}
                  className="text-sm text-dark bg-gray-100 px-4 py-2 rounded shadow"
                >
                  {skill.name || skill}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-center text-gray-400">No skills added yet.</p>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-6 w-full text-center">
          <div className="p-4 bg-gray-100 rounded shadow-lg">
            <h3 className="text-2xl font-bold text-primary">
              {profile.totalEarnings ?? 0}
            </h3>
            <p className="text-dark text-sm">Total Earnings</p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow-lg">
            <h3 className="text-2xl font-bold text-primary">
              {profile.avgRating?.toFixed(1) || "N/A"}
            </h3>
            <p className="text-dark text-sm">Average Rating</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-8">
          <Button
            content="Edit Profile"
            className="bg-secondary hover:bg-primary"
            onClick={() => window.location.replace("/edit-profile")}
          />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-xl font-semibold text-secondary border-b pb-4">
          Reviews
        </h2>
        {profile.reviews?.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {profile.reviews.map((review, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-dark">
                    {review.reviewerName}
                  </h3>
                  <span className="text-primary font-bold">
                    {review.rating} ⭐
                  </span>
                </div>
                <p className="text-xs text-gray-500">{review.date}</p>
                <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-center text-gray-400">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
