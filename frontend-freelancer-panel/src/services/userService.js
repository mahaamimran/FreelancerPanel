import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Fetch user profile
export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

// Update user profile
export const updateUserProfile = async (token, profileData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users/profile`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update profile");
  }
};

// Fetch all skills
export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/skills`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch skills");
  }
};


export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      ...formData,
      role: "freelancer", // Ensure role is always set to "freelancer"
    });
    return response.data;
  } catch (error) {
    throw error; // Let the calling code handle the error
  }
};