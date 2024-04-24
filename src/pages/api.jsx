import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:7209", // Adjust the base URL if necessary
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("authToken");

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config
    return config;
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default api;
