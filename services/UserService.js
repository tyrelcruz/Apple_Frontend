import axios from "axios";
import constants from "../constants";

// API Access to Front-end JSON data transformation or decoder
const API = axios.create({
  baseURL: `${constants.HOST}/users`,
});

// Fetch users
export const fetchUsers = (user) => API.get("/", user);

// Create user
export const createUser = (user) => API.post("/", user);

// Update user
export const updateUser = (id, user) => API.put(`/${id}`, user);

// Delete user
export const deleteUser = (id) => API.delete(`/${id}`);

// Login user
export const loginUser = (credentials) => API.post("/login", credentials);
