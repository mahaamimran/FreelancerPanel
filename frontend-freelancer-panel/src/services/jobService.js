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
