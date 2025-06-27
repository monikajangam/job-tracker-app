import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const JobApplicationDetail = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F6F7FB 60%, #A78BFA 100%)', py: 6 }}>
      <Container maxWidth="lg">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(124,58,237,0.10)', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
            Job Application Details
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Job application details will be implemented here.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default JobApplicationDetail; 