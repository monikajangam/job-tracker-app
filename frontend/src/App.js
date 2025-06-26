import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Import components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import JobApplications from './components/JobApplications';
import JobApplicationForm from './components/JobApplicationForm';
import JobApplicationDetail from './components/JobApplicationDetail';
import Interviews from './components/Interviews';
import Login from './components/Login';
import Register from './components/Register';

// Import context
import { AuthProvider, useAuth } from './context/AuthContext';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Main App component
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        {isAuthenticated && <Navbar />}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/applications" element={
              <ProtectedRoute>
                <JobApplications />
              </ProtectedRoute>
            } />
            <Route path="/applications/new" element={
              <ProtectedRoute>
                <JobApplicationForm />
              </ProtectedRoute>
            } />
            <Route path="/applications/:id" element={
              <ProtectedRoute>
                <JobApplicationDetail />
              </ProtectedRoute>
            } />
            <Route path="/applications/:id/edit" element={
              <ProtectedRoute>
                <JobApplicationForm />
              </ProtectedRoute>
            } />
            <Route path="/interviews" element={
              <ProtectedRoute>
                <Interviews />
              </ProtectedRoute>
            } />
            
            {/* Redirect to dashboard if authenticated, otherwise to login */}
            <Route path="*" element={
              isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
            } />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

// Root App component with providers
function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
