import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const JobApplicationDetail = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, mb: 4 }}>
        Job Application Details
      </Typography>
      <Box>
        <Typography variant="body1">
          Job application details will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default JobApplicationDetail; 