import api from "./api";

export const fetchJobs = async (filters = {}) => {
    try {
        const response = await api.get("/jobs", { params: filters });
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error("API responded with failure");
    } catch (error) {
        console.error("Error in fetchJobs:", error.response || error.message);
        throw error;
    }
};
export const fetchJobById = async (id) => {
  try {
    const response = await api.get(`/jobs/${id}`);
    if (response.data.success) {
      return response.data.data; 
    }
    throw new Error("Job not found or API responded with failure");
  } catch (error) {
    console.error("Error in fetchJobById:", error.response || error.message);
    throw error;
  }
};

export const fetchInProgressJobs = async (token) => {
  try {
    const response = await api.get("/jobs/in-progress", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      return response.data.data;
    }
    throw new Error("Failed to fetch in-progress jobs.");
  } catch (error) {
    console.error("Error in fetchInProgressJobs:", error.response || error.message);
    throw error;
  }
};