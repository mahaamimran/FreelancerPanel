import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2; // Number of jobs to display per page

  // Mock job data
  useEffect(() => {
    const fetchJobs = async () => {
      // Replace this with API call to fetch jobs from your backend
      const mockJobs = [
        {
          title: "Software Engineer",
          description: "Develop scalable web applications using React and Node.js.",
          preferredLocation: "Remote",
          budgetType: "Fixed",
          budgetAmount: 5000,
          hourlyRate: null,
          experienceLevel: "Intermediate",
          status: "Open",
        },
        {
          title: "Front-End Developer",
          description: "Design responsive UIs for web and mobile applications.",
          preferredLocation: "Remote",
          budgetType: "Hourly",
          budgetAmount: null,
          hourlyRate: 50,
          experienceLevel: "Entry",
          status: "Open",
        },
        {
          title: "UI/UX Designer",
          description: "Create designs for web and mobile applications.",
          preferredLocation: "On-site",
          budgetType: "Fixed",
          budgetAmount: 4000,
          hourlyRate: null,
          experienceLevel: "Entry",
          status: "Open",
        },
        {
          title: "Backend Developer",
          description: "Build server-side logic and manage database operations.",
          preferredLocation: "Remote",
          budgetType: "Hourly",
          budgetAmount: null,
          hourlyRate: 70,
          experienceLevel: "Expert",
          status: "Open",
        },
      ];
      setJobs(mockJobs);
    };

    fetchJobs();
  }, []);

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="font-sans">
      {/* Header Section */}
      <header className="bg-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-dark">
            FIND NEW <span className="text-primary">WORK</span> TODAY
          </h1>
          <p className="text-gray-600 mt-2">
            Thousands of jobs in the computer, engineering, and technology sectors are waiting for you.
          </p>

          {/* Search Bar */}
          <div className="flex flex-wrap items-center justify-center mt-6 gap-4">
            <input
              type="text"
              placeholder="What position are you looking for?"
              className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657A8 8 0 116.343 5.343M15 13h5m0 0v5m0-5l-5 5"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Location"
                className="w-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition">
              Search Work
            </button>
          </div>
        </div>
      </header>

      {/* Jobs Section */}
      <main className="container mx-auto mt-10 grid grid-cols-12 gap-8">
        {/* Filters */}
        <aside className="col-span-3 bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-dark">Filters</h2>
          <div className="mt-4 space-y-4">
            <h3 className="text-sm font-medium text-gray-600">Location</h3>
            <div className="space-y-2">
              <label className="block">
                <input type="radio" name="location" className="mr-2" />
                Near me
              </label>
              <label className="block">
                <input type="radio" name="location" className="mr-2" />
                Remote job
              </label>
              <label className="block">
                <input type="radio" name="location" className="mr-2" />
                Exact location
              </label>
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <section className="col-span-6">
          <h2 className="text-xl font-bold text-dark mb-4">{jobs.length} Jobs</h2>

          {/* Job Cards */}
          <div className="space-y-4">
            {currentJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>

        {/* Sidebar */}
        <aside className="col-span-3 space-y-6">
          <div className="p-6 bg-white rounded-lg shadow">
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

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-dark">Get noticed faster</h2>
            <p className="text-sm text-gray-600 mt-2">
              Learn how to create a standout resume.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default JobList;
