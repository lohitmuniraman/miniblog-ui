import React, { useEffect, useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';
import { getProfile } from '@services/authService';

const ProfilePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const callGetProfile = async () => {
        const response = await getProfile()
        setEmail(response.email)
        setUsername(response.username)
    }
    callGetProfile()
  }, [])

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        disabled
      />
      <TextField
        label="Username"
        type="text"
        fullWidth
        margin="normal"
        value={username}
        disabled
      />
    </Box>
  );
};

export default ProfilePage;