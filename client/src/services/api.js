import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "https://quiz-app-backend-zbxq.onrender.com";

const api = axios.create({
  baseURL: apiBaseUrl,
});

export default api;