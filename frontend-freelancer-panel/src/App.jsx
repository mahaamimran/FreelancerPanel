import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './pages/Joblist';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="*" element={<h1 className="text-center mt-20 text-2xl font-bold">404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
