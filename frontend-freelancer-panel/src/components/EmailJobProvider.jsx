import React from "react";

const EmailJobProvider = ({ email }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleEmailClick}
        className="w-full bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-all duration-300"
      >
        Email Job Provider
      </button>
    </div>
  );
};

export default EmailJobProvider;
