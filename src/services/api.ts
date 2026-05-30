import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "X-Auth-Token": API_KEY,
    "Content-Type": "application/json",
  },
});

export default api;
