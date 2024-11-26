import React from "react";
import { MdPerson, MdEmail, MdInfo, MdStar } from "react-icons/md";

const AboutJobProvider = ({ provider }) => {
  if (!provider) return null;

  return (
    <div className="p-6 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        About the Job Provider
      </h3>
      <div className="space-y-2">
        <p className="flex items-center text-gray-700">
          <MdPerson className="text-secondary mr-2" />
          <strong className="mr-1">Name:</strong> {provider.firstName} {provider.lastName}
        </p>
        <p className="flex items-center text-gray-700">
          <MdEmail className="text-secondary mr-2" />
          <strong className="mr-1">Email:</strong> {provider.email}
        </p>
        <p className="flex items-center text-gray-700">
          <MdInfo className="text-secondary mr-2" />
          <strong className="mr-1">Bio:</strong> {provider.bio || "No bio available."}
        </p>
        <p className="flex items-center text-gray-700">
          <MdStar className="text-secondary mr-2" />
          <strong className="mr-1">Average Rating:</strong> {provider.avgRating || "Not rated yet"}
        </p>
      </div>
    </div>
  );
};

export default AboutJobProvider;
