import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api/auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register a new user
export const registerUser = (userData) => {
  return api.post('/register', userData);
};

// Login user
export const loginUser = (username, password) => {
  return api.post('/login', { username, password });
};

// Get user profile
export const getUserProfile = (userId) => {
  return api.get(`/profile/${userId}`);
};

// Get user by username
export const getUserByUsername = (username) => {
  return api.get(`/user/${username}`);
};

// Update user profile
export const updateUserProfile = (userId, userData) => {
  return api.put(`/profile/${userId}`, userData);
};

// Logout user
export const logoutUser = () => {
  return api.post('/logout');
};

export default api;
