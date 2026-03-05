import axios from "axios";

const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  timeout: 50000,
});

export default api;