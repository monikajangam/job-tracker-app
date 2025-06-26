import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { jobApplicationsAPI } from '../services/api';

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
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Applications */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Applications
              </Typography>
              <Typography variant="h3" component="div">
                {stats?.total_applications || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Applications */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Recent (30 days)
              </Typography>
              <Typography variant="h3" component="div">
                {stats?.recent_applications || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Interviews */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Upcoming Interviews
              </Typography>
              <Typography variant="h3" component="div">
                {stats?.upcoming_interviews || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Status Distribution */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Status Distribution
              </Typography>
              {stats?.status_counts?.map((status) => (
                <Box key={status.status} sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    {status.status}: {status.count}
                  </Typography>
                </Box>
              )) || (
                <Typography variant="body2">
                  No applications yet
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to your Job Application Tracker!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Start by adding your first job application to track your job search progress.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard; 