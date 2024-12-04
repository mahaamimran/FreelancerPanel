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
      const response = await axios.get(`${API_URL}/${jobId}/me`, config); // API endpoint
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        console.log("No proposal found for this job.");
        return null; // Explicitly return null for no proposal
      }
      console.error("Error fetching user proposal:", error.response?.data || error.message);
      throw error; // Propagate other errors
    }
  };
  
  export const fetchProposalById = async (proposalId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`${API_URL}/${proposalId}`, config);
    return response.data;
  };
  
  export const updateProposal = async (proposalId, updatedProposal, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`${API_URL}/${proposalId}`, updatedProposal, config);
    return response.data;
  };
  
  export const deleteProposal = async (jobId, proposalId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(`${API_URL}/${jobId}/${proposalId}`, config);
    return response.data;
  };
  