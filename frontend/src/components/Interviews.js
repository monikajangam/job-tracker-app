import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Interviews = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, mb: 4 }}>
        Interviews
      </Typography>
      <Box>
        <Typography variant="body1">
          Interviews management will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Interviews; 