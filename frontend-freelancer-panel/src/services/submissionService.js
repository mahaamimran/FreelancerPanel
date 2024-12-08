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
  const response = await api.get(`/submissions/${jobId}`);
  return response.data;
};

// Update a submission
export const updateSubmission = async (submissionId, updatedData) => {
  const response = await api.put(`/submissions/${submissionId}`, updatedData);
  return response.data;
};

// Delete a submission
export const deleteSubmission = async (submissionId) => {
  const response = await api.delete(`/submissions/${submissionId}`);
  return response.data;
};
