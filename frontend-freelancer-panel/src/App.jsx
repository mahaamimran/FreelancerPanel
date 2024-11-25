import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import JobList from "./pages/Joblist";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import EditProfilePage from "./pages/EditProfilePage";
import "./App.css";

function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
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

  // Check if current path is in noNavbarRoutes
  if (noNavbarRoutes.includes(location.pathname)) {
    return null; // Do not render Navbar
  }

  return <Navbar />;
};

export default App;
