import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { login } from "@/services/loginService";
import AuthContext from "@/context/AuthContext";
import googleLogo from "../assets/google-logo.svg";
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
      <div className="relative flex-1 sm:flex-[2] w-full max-w-lg flex flex-col justify-center p-8 bg-gray-50">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-primary hover:underline text-sm font-semibold"
        >
          &larr; Back
        </button>
        <h1 className="text-4xl font-bold text-dark mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-500 mb-6">
          Log in to access your account
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <Button
            type="submit"
            content="Log In"
            className="w-full bg-primary hover:bg-secondary py-3 rounded-xl text-white text-lg font-semibold"
          />
          {/* Login with Google Button */}
          <button
            className="w-full flex items-center justify-center px-4 py-3 bg-white text-dark border border-gray-300 hover:bg-gray-100 rounded-xl text-lg font-semibold"
          >
            <img
              src={googleLogo}
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Log in with Google
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Right Section - Dynamic Typing Animation */}
      <div className="flex-1 sm:flex-[1] bg-secondary flex flex-col justify-center items-center p-8">
        <DynamicText
          phrases={[
            "Empower Your Career.",
            "Explore New Horizons.",
            "Connect with Clients.",
            "Showcase Your Skills.",
          ]}
        />
      </div>
    </div>
  );
}
