import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import Button from "../components/ui/Button";
import AuthContext from "../context/AuthContext";

const TrailDot = ({ x, y }) => {
  return (
    <motion.div
      className="absolute w-8 h-8 bg-primary/30 rounded-full pointer-events-none"
      style={{
        top: y - 16, // Offset to center the dot
        left: x - 16, // Offset to center the dot
        zIndex: 20, // Ensure trail dots are above the background
      }}
      animate={{
        opacity: [1, 0], // Fade out
        scale: [1, 0.5], // Shrink slightly
      }}
      transition={{
        duration: 2, // Fading out duration
        ease: "easeOut",
      }}
    />
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [trail, setTrail] = useState([]); // Array of dots
  const { login } = useContext(AuthContext); // Use AuthContext for login

  useEffect(() => {
    // Handle authentication by extracting token and user info from URL
    const handleAuthentication = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const user = params.get("user");

      if (token && user) {
        try {
          // Parse user data and save it with the token
          const parsedUser = JSON.parse(decodeURIComponent(user));
          login({ ...parsedUser, token });
          window.history.replaceState({}, document.title, "/dashboard"); // Clean up URL
        } catch (err) {
          console.error("Error parsing user data:", err);
        }
      }
    };

    handleAuthentication();
  }, [login]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTrail((prevTrail) => [
        ...prevTrail.slice(-15), // Keep only the last 15 dots
        { x: e.clientX, y: e.clientY, id: uuidv4() }, // Generate a UUID for the dot
      ]);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/jobs");
  };

  return (
    <div className="relative bg-gradient-to-b from-white via-primary/10 to-primary/50 min-h-screen flex flex-col items-center justify-center text-dark overflow-hidden pt-10">
      {/* Cursor Trail */}
      {trail.map((dot) => (
        <TrailDot key={dot.id} x={dot.x} y={dot.y} />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-7xl font-extrabold tracking-wide leading-tight text-secondary mb-6">
            Welcome to{" "}
            <motion.span
              className="text-primary inline-block"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              SkillConnect
            </motion.span>
          </h1>
          <p className="text-xl text-dark/80">
            Unlock thousands of opportunities in technology, design, and
            engineering. The future of work starts here.
          </p>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8"
        >
          <Button
            content="Get Started"
            onClick={handleGetStarted}
            className="text-4xl px-10 py-5 rounded-full bg-primary text-white hover:bg-primary transition-colors duration-300 shadow-lg hover:shadow-[0_0_30px_10px_rgba(53,117,226,0.5)]"
            style={{
              transition: "box-shadow 0.3s ease-in-out",
            }}
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 flex justify-center gap-6 flex-wrap"
      >
        <FeatureCard
          title="Find Work"
          description="Access thousands of jobs tailored to your skills."
        />
        <FeatureCard
          title="Grow Your Network"
          description="Connect with professionals and build your career."
        />
        <FeatureCard
          title="Achieve Success"
          description="Take the first step toward achieving your career goals."
        />
      </motion.div>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ title, description }) => (
  <motion.div
    className="flex flex-col items-center bg-white bg-opacity-30 rounded-xl p-6 text-center shadow-lg w-52 h-44 cursor-pointer"
    whileHover={{
      scale: 1.1,
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <h3 className="text-xl font-bold text-primary">{title}</h3>
    <p className="text-md text-dark/90 mt-2">{description}</p>
  </motion.div>
);

export default LandingPage;
