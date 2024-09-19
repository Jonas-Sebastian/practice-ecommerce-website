import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiServiceInstance from '../../services/ApiService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default function AdminLogin() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to check if the input is an email address
  const isEmail = (str) => {
    // Simple regex for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apiServiceInstance.loginUser({
        // Use email if input looks like an email address, otherwise use username
        email: isEmail(usernameOrEmail) ? usernameOrEmail : undefined,
        username: !isEmail(usernameOrEmail) ? usernameOrEmail : undefined,
        password: password
      });
      
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard'); // Redirect to the dashboard upon successful login
    } catch (err) {
      setError('Invalid credentials or login failed');
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/admin/register');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
          <TextField
            label="Username or Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleNavigateToRegister}
          >
            Register
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
