import React from "react";

const EmailSubscription = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow h-full">
        <h2 className="text-lg font-semibold text-dark">Email me for jobs</h2>
        <p className="text-sm text-gray-600 mt-2">
          Stay updated with the latest job postings.
        </p>
        <input
          type="email"
          placeholder="name@mail.com"
          className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="mt-4 w-full px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition">
          Subscribe
        </button>
      </div>
    );
  };
  

export default EmailSubscription;
