import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';
import { useToast } from '@contexts/ToastContext';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const { openToast, handleSetMessage } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const success = await register({ email, password, username, name });
      if (success) {
        handleSetMessage('Registration successful! Please login.');
        openToast();
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Register
      </Typography>
      <TextField
        label="Name"
        type="text"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
        label="Username"
        type="text"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        Register
      </Button>
      <Typography variant="body2" textAlign="center">
        Already registered?{" "}
        <Link style={{ color: "#2b282b" }} to="/login">
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;