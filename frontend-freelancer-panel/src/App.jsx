import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import JobList from "./pages/Joblist";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import EditProfilePage from "./pages/EditProfilePage";
import SignUpPage from "./pages/SignUpPage";
import JobDetails from "./pages/JobDetails";
import SubmitProposalPage from "./pages/SubmitProposalPage";
import UpdateProposalPage from "./pages/UpdateProposalPage";
import ActiveJobsPage from "./pages/ActiveJobsPage";
import ActiveJobDetailsPage from "./pages/ActiveJobDetailsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/active-jobs" element={<ActiveJobsPage />} />
          <Route path="/active-jobs/:id" element={<ActiveJobDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/jobs/:id" element={<JobDetails />} /> 
          <Route path="/jobs/:id/submit-proposal" element={<SubmitProposalPage />} />
          <Route path="/jobs/:jobId/update-proposal" element={<UpdateProposalPage />} />
          <Route
            path="*"
            element={
              <h1 className="text-center mt-20 text-2xl font-bold">
                404 Not Found
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Helper component to conditionally render Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  const noNavbarRoutes = ["/login", "/signup"]; // Define paths where navbar should be hidden

  if (noNavbarRoutes.includes(location.pathname)) {
    return null; // Do not render Navbar
  }

  return <Navbar />;
};

export default App;
