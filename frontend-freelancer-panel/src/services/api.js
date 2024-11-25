import axios from "axios";

const api = axios.create({
  baseURL:  "http://localhost:3000/api", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchJobs = async (filters = {}) => {
    try {
      console.log("Sending API request with filters:", filters);
      const response = await api.get("/jobs/", { params: filters });
      console.log("API Response:", response.data); // Full API response
  
      // Directly return the data since the response is already an array
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside the range of 2xx
        console.error("API Error Response:", error.response.data);
      } else if (error.request) {
        // Request was made, but no response received
        console.error("API Request Error:", error.request);
      } else {
        // Something else caused an error
        console.error("Unexpected Error:", error.message);
      }
      throw error;
    }
  };
  
  
  

export default api;
