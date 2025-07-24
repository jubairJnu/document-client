// lib/axiosInstance.ts
import config from "@/app/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: config.api, // or use your `baseApi` directly
});

// Automatically include token in headers if found in localStorage or cookies
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token"); // or get from cookies
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default axiosInstance;
