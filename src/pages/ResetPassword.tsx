import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@contexts/ToastContext";

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { callResetPassword } = useAuth();
  const navigate = useNavigate();
  const { openToast, handleSetMessage } = useToast();
  const [showError, setShowError] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    setEmail(state.email);
  }, [state]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      if (password !== confirmPassword) {
        setShowError(true);
        setError("Passwords not matching");
      } else {
        const response = await callResetPassword({ email, password });
        if (response) {
          handleSetMessage(response.message);
          openToast();
          navigate("/login");
        } else {
          setError("Password reset failed. Try again!");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Reset Password
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled
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
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        error={showError}
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
        Submit
      </Button>
    </Box>
  );
};

export default ResetPasswordPage;
