import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/proposals`;

export const submitProposal = async (proposalData, token) => {
    try {
      console.log("Submitting Proposal:", proposalData);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(API_URL, proposalData, config);
      console.log("Proposal Submitted Successfully:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error in submitProposal service:", err.response?.data || err.message);
      throw err;
    }
  };
  
  
  export const fetchUserProposal = async (jobId, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      console.log("Fetching proposal for job ID:", jobId);
      const response = await axios.get(`${API_URL}/${jobId}/me`, config);
      console.log("Fetched user proposal successfully:", response.data);
  
      return response.data;
    } catch (error) {
      console.error("Error fetching user proposal:", error.response?.data || error.message);
      throw error;
    }
  };
  
  