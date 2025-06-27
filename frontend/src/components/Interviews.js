import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const Interviews = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F6F7FB 60%, #A78BFA 100%)', py: 6 }}>
      <Container maxWidth="lg">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(124,58,237,0.10)', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
            Interviews
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Interviews management will be implemented here.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Interviews; 