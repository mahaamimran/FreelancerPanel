import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { registerUser } from "@/services/userService";
import AuthContext from "@/context/AuthContext";
import googleLogo from "../assets/google-logo.svg";
import logo from "../assets/logo-without-text.png";
import DynamicText from "@/components/DynamicText";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const { login: setUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 8)
      return "Strong";
    return "Moderate";
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.email.includes("@"))
      newErrors.email = "Invalid email format.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userData = await registerUser(formData);
      setUserLogin(userData); // Automatically log in the user
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Failed to sign up" });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Left Section - Dynamic Typing Animation */}
      <div className="flex-1 sm:flex-[3] bg-secondary flex flex-col justify-center items-center p-10 sm:p-16 text-white">
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

      {/* Right Section - Sign Up Form */}
      <div className="flex-1 sm:flex-[2] bg-gray-50 flex flex-col justify-center items-center p-8 sm:p-12">
        <div className="flex items-center space-x-4 mb-6">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <h1 className="text-4xl font-bold text-primary">Create Account</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">Sign up to get started</p>
        <form onSubmit={handleSignUp} className="space-y-6 w-full max-w-md">
          <Input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            error={errors.firstName}
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            error={errors.lastName}
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
          />
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setPasswordStrength(calculatePasswordStrength(e.target.value));
              }}
              error={errors.password}
            />
            <p
              className={`text-sm mt-1 ${
                passwordStrength === "Weak"
                  ? "text-red-500"
                  : passwordStrength === "Moderate"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              Strength: {passwordStrength}
            </p>
          </div>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
          />
          {errors.general && (
            <p className="mt-2 text-sm text-red-500">{errors.general}</p>
          )}
          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white text-lg font-semibold py-4 rounded-xl hover:bg-primary-dark focus:ring-4 focus:ring-primary-light transition"
          >
            Sign Up
          </button>
          {/* Sign Up with Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 bg-white text-dark border border-gray-300 rounded-xl text-lg font-semibold hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 transition"
          >
            <img
              src={googleLogo}
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Sign Up with Google
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
