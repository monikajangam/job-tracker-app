import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  Avatar
} from '@mui/material';
import { BarChart, Work, Event, PieChart } from '@mui/icons-material';
import { jobApplicationsAPI } from '../services/api';

const iconStyles = {
  bgcolor: 'primary.main',
  color: '#fff',
  width: 48,
  height: 48,
  mb: 1,
  boxShadow: '0 4px 16px 0 rgba(124,58,237,0.10)'
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await jobApplicationsAPI.getDashboardStats();
        setStats(response.data);
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F6F7FB 60%, #A78BFA 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F6F7FB 60%, #A78BFA 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F6F7FB 60%, #A78BFA 100%)', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4, color: 'primary.main', textAlign: 'center' }}>
          Dashboard
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Total Applications */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(124,58,237,0.10)' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={iconStyles}><Work /></Avatar>
                <Typography color="textSecondary" gutterBottom>
                  Total Applications
                </Typography>
                <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {stats?.total_applications || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Applications */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(124,58,237,0.10)' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={iconStyles}><BarChart /></Avatar>
                <Typography color="textSecondary" gutterBottom>
                  Recent (30 days)
                </Typography>
                <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {stats?.recent_applications || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Upcoming Interviews */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(124,58,237,0.10)' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={iconStyles}><Event /></Avatar>
                <Typography color="textSecondary" gutterBottom>
                  Upcoming Interviews
                </Typography>
                <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {stats?.upcoming_interviews || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Status Distribution */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(124,58,237,0.10)' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={iconStyles}><PieChart /></Avatar>
                <Typography color="textSecondary" gutterBottom>
                  Status Distribution
                </Typography>
                {stats?.status_counts?.length ? (
                  stats.status_counts.map((status) => (
                    <Box key={status.status} sx={{ mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {status.status}: {status.count}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">
                    No applications yet
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome to your Job Application Tracker!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Start by adding your first job application to track your job search progress.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard; 