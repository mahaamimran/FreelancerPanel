import api from "./api";

// Fetch all skills
export const fetchSkills = async () => {
  try {
    const response = await api.get("/skills");
    if (response.status === 200) {
      return response.data; // Assuming your API returns skills in `data`
    }
    throw new Error("Failed to fetch skills");
  } catch (error) {
    console.error("Error in fetchSkills:", error.response || error.message);
    throw error;
  }
};
