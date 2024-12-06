import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJobs } from "../services/jobService";
import { Spinner } from "../components/ui/Spinner";
import { motion } from "framer-motion";

const ActiveJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInProgressJobs = async () => {
      try {
        const jobsData = await fetchJobs({ status: "In Progress" });
        setJobs(jobsData);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load in-progress jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInProgressJobs();
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white py-16 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-bold text-secondary">
            ACTIVE <span className="text-primary">JOBS</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore the jobs you are currently working on.
          </p>
        </div>
      </div>

      <div className="container mx-auto mt-12 px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Jobs List Section */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {jobs.length > 0 ? (
            <ul className="space-y-6">
              {jobs.map((job) => (
                <motion.li
                  key={job._id}
                  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    to={`/active-jobs/${job._id}`}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-secondary">{job.title}</h2>
                      <div className="mt-2 bg-blue-100 text-blue-800 font-semibold text-sm px-4 py-2 rounded-lg inline-block shadow-md">
                        Status: {job.status}
                      </div>
                    </div>
                    <span className="text-primary font-semibold">View Details →</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400 mt-20">No active jobs found.</p>
          )}
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-blue-50 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-semibold text-primary mb-4">💡 Tips for Success</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
            <li>Personalize your proposals to the job and provider.</li>
            <li>Highlight your relevant experience and achievements.</li>
            <li>Provide concrete examples or case studies of past work.</li>
            <li>Be concise, professional, and confident in your tone.</li>
            <li>Ensure your budget is competitive yet fair for your expertise.</li>
            <li>Communicate promptly and effectively with your job provider.</li>
            <li>Keep track of deadlines and milestones to ensure timely delivery.</li>
            <li>Showcase your creativity and problem-solving skills during the project.</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ActiveJobsPage;
