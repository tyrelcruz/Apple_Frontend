import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/users",
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch users
export const fetchUsers = () => API.get("/");

// Create user
export const createUser = (user) => API.post("/", user);

// Update user
export const updateUser = (id, user) => API.put(`/${id}`, user);

// Delete user
export const deleteUser = (id) => API.delete(`/${id}`);

// Login user
export const loginUser = (credentials) => API.post("/login", credentials);
