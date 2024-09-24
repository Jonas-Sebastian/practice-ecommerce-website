import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const ContactPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          We'd love to hear from you! Here’s how you can reach us:
        </Typography>
        <Typography variant="h6" component="h2">
          Email:
        </Typography>
        <Typography variant="body1" gutterBottom>
          contact@example.com
        </Typography>
        <Typography variant="h6" component="h2">
          Phone:
        </Typography>
        <Typography variant="body1" gutterBottom>
          +1 (234) 567-8900
        </Typography>
        <Typography variant="h6" component="h2">
          Address:
        </Typography>
        <Typography variant="body1">
          123 Example St,<br />
          City, State, 12345
        </Typography>
      </Paper>
    </Container>
  );
};

export default ContactPage;
