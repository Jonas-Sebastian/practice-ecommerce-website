import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          Welcome to our shop! We are passionate about providing quality products and excellent service.
        </Typography>
        <Typography variant="body1">
          Our mission is to create a unique shopping experience with items that inspire and delight.
        </Typography>
        <Typography variant="body1">
          Thank you for choosing us. We look forward to serving you!
        </Typography>
        <Typography variant="body1" style={{ marginTop: '2rem', fontStyle: 'italic' }}>
          This website is made by: Jonas Miguel P. Sebastian
        </Typography>
      </Paper>
    </Container>
  );
};

