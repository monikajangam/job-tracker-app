import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const JobApplicationForm = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, mb: 4 }}>
        Add Job Application
      </Typography>
      <Box>
        <Typography variant="body1">
          Job application form will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default JobApplicationForm; 