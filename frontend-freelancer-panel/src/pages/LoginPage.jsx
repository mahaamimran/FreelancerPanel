import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { login } from "@/services/loginService";
import AuthContext from "@/context/AuthContext";
import googleLogo from "../assets/google-logo.svg";
import logo from "../assets/logo-without-text.png"; 
import DynamicText from "@/components/DynamicText";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login: setUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.includes("@")) newErrors.email = "Invalid email format.";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userData = await login(email, password);
      setUserLogin(userData);
      navigate("/");
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Left Section - Login */}
      <div className="flex-1 sm:flex-[3] w-full max-w-2xl flex flex-col justify-center p-8 sm:p-12 bg-gray-50 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-primary hover:underline text-sm font-semibold"
        >
          &larr; Back
        </button>
        {/* Logo and Heading */}
        <div className="flex items-center mb-6">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <h1 className="text-5xl font-bold text-primary">Welcome Back</h1>
        </div>
        <p className="text-lg text-gray-500 mb-6 ml-2">
          Log in to access your account
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          {errors.general && (
            <p className="mt-2 text-sm text-red-500">{errors.general}</p>
          )}
          {/* Log In Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white text-lg font-semibold py-4 rounded-xl hover:bg-primary-dark focus:ring-4 focus:ring-primary-light transition"
          >
            Log In
          </button>
          {/* Login with Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 bg-white text-dark border border-gray-300 rounded-xl text-lg font-semibold hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 transition"
          >
            <img
              src={googleLogo}
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Log in with Google
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Right Section - Dynamic Typing Animation */}
      <div className="hidden sm:flex flex-1 sm:flex-[2] bg-secondary flex-col justify-center items-center p-8">
        <DynamicText
          phrases={[
            "Empower Your Career.",
            "Explore New Horizons.",
            "Connect with Clients.",
            "Showcase Your Skills.",
            "Find Your Dream Job.",
            "Join SkillConnect Today.",
          ]}
        />
      </div>
    </div>
  );
}
