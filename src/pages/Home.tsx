import React, { useEffect } from "react";
import { Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@contexts/AuthContext";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login')
    }
  }, [])
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Welcome, {user?.username || user?.email}!
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          This is your private dashboard. You can add more content and features
          here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HomePage;
