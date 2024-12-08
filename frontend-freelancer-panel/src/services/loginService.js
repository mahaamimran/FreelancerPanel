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

export const loginWithGoogle = async (setIsLoggedIn, setUser) => {
  try {
    // Make a request to fetch user data after Google login
    const response = await api.get("/auth/google/user", {
      withCredentials: true, // Ensure cookies are included
    });

    const { user, token } = response.data;

    // Validate response data
    if (!user || !token) {
      console.error("Invalid response data:", response.data);
      throw new Error("Invalid response from server");
    }

    console.log("Google user logged in successfully:", user);
    console.log("Token received:", token);

    // Store token in cookies
    console.log("Storing token in cookies...");
    storeToken(token);

    console.log("cookies now are", Cookies.get());

    // Update context
    setIsLoggedIn(true);
    setUser(user);

    console.log("Google login process completed successfully");
    return user;
  } catch (error) {
    console.error("Google login error:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });
    throw error;
  }
};
