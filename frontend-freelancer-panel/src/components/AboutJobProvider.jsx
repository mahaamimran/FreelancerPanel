import React from "react";

const AboutJobProvider = ({ provider }) => {
  if (!provider) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">About the Job Provider</h3>
      <p>
        <strong>Name:</strong> {provider.firstName} {provider.lastName}
      </p>
      <p>
        <strong>Email:</strong> {provider.email}
      </p>
      <p>
        <strong>Bio:</strong> {provider.bio || "No bio available."}
      </p>
      <p>
        <strong>Average Rating:</strong> {provider.avgRating || "Not rated yet"}
      </p>
    </div>
  );
};

export default AboutJobProvider;
