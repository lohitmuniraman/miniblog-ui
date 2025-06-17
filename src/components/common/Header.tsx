import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import logo from '@assets/memoir.png'

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar style={{backgroundColor: '#ecd8cc'}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer', color: '#2b282b' }} onClick={() => navigate('/app/dashboard')}>
          <img height={"100px"} width={"100px"} src={logo} alt="Logo" />
        </Typography>
        <Box>
          {isAuthenticated ? (
            <>
              <Button onClick={() => navigate('/app/dashboard')}>
                Dashboard
              </Button>
              <Button onClick={() => navigate('/app/profile')}>
                Profile
              </Button>
              <Button onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;