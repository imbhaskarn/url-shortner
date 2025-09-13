// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // change to your backend URL in production
  withCredentials: true, // if you use cookies/auth
});

export default api;
