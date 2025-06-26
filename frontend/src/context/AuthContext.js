import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Get the backend URL from environment variables or use default
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      // Verify token with backend
      axios.get(`${BACKEND_URL}/api-auth/user/`)
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api-token-auth/`, {
        username,
        password
      });
      
      const { token } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      // Get user data
      const userResponse = await axios.get(`${BACKEND_URL}/api-auth/user/`);
      setUser(userResponse.data);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.non_field_errors?.[0] || 'Login failed' 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api-auth/registration/`, userData);
      
      // Auto-login after successful registration
      const loginResult = await login(userData.username, userData.password1);
      return loginResult;
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Registration failed' 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 