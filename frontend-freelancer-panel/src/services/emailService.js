import api from "./api";

export const sendEmailToProvider = async ({ providerEmail, userName, message }) => {
  try {
    console.log("Attempting to send email with the following payload:");
    console.log({
      providerEmail,
      userName,
      message,
    });

    const response = await api.post("/email/job-provider", {
      providerEmail,
      userName,
      message,
    });

    console.log("API Request Details:");
    console.log("URL:", api.defaults.baseURL + "/email/job-provider");
    console.log("Headers:", api.defaults.headers);
    console.log("Payload Sent:", { providerEmail, userName, message });

    console.log("API Response Received:");
    console.log("Status:", response.status);
    console.log("Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error occurred during API call:");
    console.error("Request URL:", api.defaults.baseURL + "/email/job-provider");
    console.error("Payload Sent:", { providerEmail, userName, message });

    if (error.response) {
      console.error("API Error Response:");
      console.error("Status Code:", error.response.status);
      console.error("Response Headers:", error.response.headers);
      console.error("Response Data:", error.response.data);
    } else if (error.request) {
      console.error("No Response Received from API:");
      console.error("Request Details:", error.request);
    } else {
      console.error("Unexpected Error:", error.message);
    }

    throw new Error(error.response?.data?.error || "Failed to send email.");
  }
};
