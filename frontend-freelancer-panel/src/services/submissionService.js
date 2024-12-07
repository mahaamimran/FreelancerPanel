import api from "./api";

export const createSubmission = async (submissionData) => {
  try {
    const response = await api.post("/submissions", submissionData);
    return response.data;
  } catch (error) {
    console.error("Error creating submission:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
