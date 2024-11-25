import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/users/login`;

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    const userData = response.data;
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
    return userData;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
