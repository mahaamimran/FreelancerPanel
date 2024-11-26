import React from "react";
import { useNavigate } from "react-router-dom";

// Panel for logged-in users
export const LoggedInPanel = ({ matchPercentage }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Match</h3>
      <div className="relative w-full bg-gray-200 rounded-full h-6 mb-4">
        <div
          className="bg-primary/60 h-6 rounded-full"
          style={{ width: `${matchPercentage}%` }}
        ></div>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-800">
          {matchPercentage}% Match
        </span>
      </div>
      <p className="text-gray-600">
        Your skills match {matchPercentage}% of the job's requirements.
      </p>
    </div>
  );
};

// Panel for non-logged-in users
export const NonLoggedInPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-lg text-center">
      <h3 className="text-lg font-semibold text-gray-700">Sign up or Log in to Apply!</h3>
      <p className="text-gray-600 mt-2">
        Create an account to check how well your profile matches this job and
        start applying to exciting opportunities.
      </p>
      <div className="mt-4 space-y-3">
        <button
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition w-full"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary-dark transition w-full"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      </div>
    </div>
  );
};
