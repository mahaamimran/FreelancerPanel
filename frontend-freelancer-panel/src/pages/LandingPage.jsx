import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/jobs");
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-primary/20 to-secondary/10 min-h-screen flex items-center justify-center text-dark overflow-hidden">
      {/* Background Circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.1,
            scale: Math.random() * 1.5 + 0.5,
            x: Math.random() * window.innerWidth - window.innerWidth / 2, // Centered
            y: Math.random() * window.innerHeight - window.innerHeight / 2, // Centered
          }}
          transition={{
            duration: 4,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-[300px] h-[300px] bg-primary rounded-full"
        ></motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-extrabold tracking-wide leading-tight">
            Welcome to <span className="text-primary">SkillConnect</span>
          </h1>
          <p className="text-lg mt-4 text-dark/70">
            Unlock thousands of opportunities in technology, design, and
            engineering. The future of work starts here.
          </p>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8"
        >
          <Button
            content="Get Started"
            onClick={handleGetStarted}
            className="text-lg px-10 py-4"
          />
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex justify-center gap-6 flex-wrap"
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
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ title, description }) => (
  <div className="flex flex-col items-center bg-white bg-opacity-20 rounded-xl p-6 text-center shadow-lg w-56 h-44">
    <h3 className="text-xl font-bold text-primary">{title}</h3>
    <p className="text-sm text-dark/90 mt-2">{description}</p>
  </div>
);

export default LandingPage;
