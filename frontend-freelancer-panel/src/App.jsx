import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Navbar /> 
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="*" element={<h1 className="text-center mt-20 text-2xl font-bold">404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
