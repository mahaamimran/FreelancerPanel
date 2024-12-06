import React, { useState, useContext, useEffect } from "react";
import { sendEmailToProvider } from "../services/emailService";
import AuthContext from "../context/AuthContext";
import { Textarea } from "../components/ui/Textarea";
import { ValidationError } from "../components/ui/ValidationError";

const EmailJobProvider = ({ email }) => { // Updated prop name
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Debug: Loaded EmailJobProvider component");
    console.log("Debug: User in AuthContext:", user);
    console.log("Debug: Provider Email passed as prop:", email); // Updated
  }, [user, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and status
    setError("");
    setStatus("");

    if (!email) {
      console.error("Error: Provider email is missing.");
      setError("Job provider email is missing. Unable to send an email.");
      return;
    }

    if (!user || !user.firstName) {
      console.error("Error: User is not logged in or 'firstName' is missing.");
      setError("You need to log in to contact the job provider.");
      return;
    }

    if (!message.trim()) {
      console.error("Error: Message field is empty.");
      setError("Message cannot be empty.");
      return;
    }

    setStatus("Sending email...");
    console.log("Debug: Preparing to send email...");
    console.log("Debug: Email details - Provider Email:", email, ", User Name:", user.firstName, ", Message:", message);

    try {
      await sendEmailToProvider({
        providerEmail: email,
        userName: user.firstName,
        message: message.trim(),
      });
      console.log("Debug: Email sent successfully.");
      setStatus("Email sent successfully!");
      setMessage(""); // Clear message field after successful submission
    } catch (error) {
      console.error("Error: Failed to send email:", error.response || error.message);
      setError(`Failed to send email: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-primary mb-4">Contact Job Provider</h3>
      {email ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            label="Your Message"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={error}
            maxLength={500}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-all duration-300"
          >
            Send Email
          </button>
          {status && (
            <p
              className={`mt-4 text-sm ${
                status.startsWith("Failed") ? "text-red-600" : "text-green-600"
              }`}
            >
              {status}
            </p>
          )}
          {error && <ValidationError message={error} />}
        </form>
      ) : (
        <ValidationError message="Job provider email is missing. Unable to send an email." />
      )}
    </div>
  );
};

export default EmailJobProvider;
