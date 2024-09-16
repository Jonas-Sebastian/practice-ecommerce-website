import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Placeholder Code
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Simulate successful registration
    localStorage.setItem('adminToken', 'yourTokenHere');
    navigate('/admin/dashboard');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
