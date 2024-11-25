import api from "./api";

export const fetchJobs = async (filters = {}) => {
  try {
    const response = await api.get("/jobs", { params: filters });
    if (response.status === 200) {
      return response.data; // Assuming your API returns jobs in `data`
    }
    throw new Error("Failed to fetch jobs");
  } catch (error) {
    console.error("Error in fetchJobs:", error.response || error.message);
    throw error;
  }
};
