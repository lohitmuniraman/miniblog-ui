import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';
import { useToast } from '@contexts/ToastContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { openToast, handleSetMessage } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const success = await login({ email, password });
      if (success) {
        handleSetMessage('Login successful!');
        openToast();
        // Redirect to posts page after successful login
        navigate('/app/posts');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Typography variant="body2" textAlign="center">
        Don't have an account?{" "}
        <Link style={{ color: "#2b282b" }} to="/register">
          Register
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;