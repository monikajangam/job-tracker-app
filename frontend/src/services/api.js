import axios from 'axios';

// Get the backend URL from environment variables or use default
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Job Applications API
export const jobApplicationsAPI = {
  // Get all job applications
  getAll: () => api.get('/api/job-applications/'),
  
  // Get a single job application
  getById: (id) => api.get(`/api/job-applications/${id}/`),
  
  // Create a new job application
  create: (data) => api.post('/api/job-applications/', data),
  
  // Update a job application
  update: (id, data) => api.put(`/api/job-applications/${id}/`, data),
  
  // Delete a job application
  delete: (id) => api.delete(`/api/job-applications/${id}/`),
  
  // Search job applications
  search: (query) => api.get(`/api/job-applications/search/?q=${encodeURIComponent(query)}`),
  
  // Get dashboard statistics
  getDashboardStats: () => api.get('/api/job-applications/dashboard_stats/'),
};

// Interviews API
export const interviewsAPI = {
  // Get all interviews
  getAll: () => api.get('/api/interviews/'),
  
  // Get a single interview
  getById: (id) => api.get(`/api/interviews/${id}/`),
  
  // Create a new interview
  create: (data) => api.post('/api/interviews/', data),
  
  // Update an interview
  update: (id, data) => api.put(`/api/interviews/${id}/`, data),
  
  // Delete an interview
  delete: (id) => api.delete(`/api/interviews/${id}/`),
  
  // Get upcoming interviews
  getUpcoming: () => api.get('/api/interviews/upcoming/'),
  
  // Get interviews for calendar
  getCalendar: (startDate, endDate) => 
    api.get(`/api/interviews/calendar/?start=${startDate}&end=${endDate}`),
};

// Notes API
export const notesAPI = {
  // Get all notes
  getAll: () => api.get('/api/notes/'),
  
  // Get a single note
  getById: (id) => api.get(`/api/notes/${id}/`),
  
  // Create a new note
  create: (data) => api.post('/api/notes/', data),
  
  // Update a note
  update: (id, data) => api.put(`/api/notes/${id}/`, data),
  
  // Delete a note
  delete: (id) => api.delete(`/api/notes/${id}/`),
};

// Auth API
export const authAPI = {
  // Login
  login: (credentials) => api.post('/api-token-auth/', credentials),
  
  // Register
  register: (userData) => api.post('/api-auth/registration/', userData),
  
  // Get current user
  getCurrentUser: () => api.get('/api-auth/user/'),
};

export default api; 