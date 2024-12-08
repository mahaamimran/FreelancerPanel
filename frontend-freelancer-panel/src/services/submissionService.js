import api from "./api";

// Create a new submission
export const createSubmission = async (submissionData) => {
  try {
    // Retrieve the token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    // Define the headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Include headers in the API request
    const response = await api.post("/submissions", submissionData, config);
    return response.data;
  } catch (error) {
    console.error("Submission API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create submission.");
  }
};


// Get all submissions for a specific job
export const getSubmissionsByJob = async (jobId) => {
  try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const config = {
          headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get(`/submissions/${jobId}`, config);
      if (response.data.success) {
          return response.data.data; // Returns submissions or empty array
      }
      throw new Error("Failed to fetch submissions.");
  } catch (error) {
      console.error("Error in getSubmissionsByJob:", error.response?.data || error.message);
      throw error;
  }
};


// Update a submission
export const updateSubmission = async (submissionId, updatedData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.put(`/submissions/${submissionId}`, updatedData, config); // Include token
    return response.data;
  } catch (error) {
    console.error("Error in updateSubmission:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update submission.");
  }
};

// Delete a submission
export const deleteSubmission = async (submissionId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.delete(`/submissions/${submissionId}`, config); // Include token
    return response.data;
  } catch (error) {
    console.error("Error in deleteSubmission:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete submission.");
  }
};


// Get a submission by ID
export const getSubmissionById = async (submissionId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await api.get(`/submissions/submission/${submissionId}`, config); // Updated route
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error("Failed to fetch submission.");
  } catch (error) {
    console.error("Error in getSubmissionById:", error.response?.data || error.message);
    throw error;
  }
};
