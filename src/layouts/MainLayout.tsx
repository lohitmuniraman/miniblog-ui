import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import logo from "@assets/memoir.png";
import { useAuth } from "@contexts/AuthContext";

const drawerWidth = 240;

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuList = [
    {
      name: "Dashboard",
      navigateTo: "dashboard",
      icon: <DashboardIcon />,
      onClick: () => navigate(`/app/dashboard`),
    },
    {
      name: "Profile",
      navigateTo: "profile",
      icon: <AccountBoxIcon />,
      onClick: () => navigate(`/app/profile`),
    },
    {
      name: "Settings",
      navigateTo: "settings",
      icon: <SettingsIcon />,
      onClick: () => navigate(`/app/settings`),
    },
    {
      name: "Logout",
      navigateTo: "logout",
      icon: <PowerSettingsNewIcon />,
      onClick: () => handleLogout(),
    },
  ];

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div
      style={{
        backgroundColor: "#ecd8cc",
        height: "100vh",
        borderRightWidth: "medium",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer", color: "#2b282b" }}
          onClick={() => navigate("/app/dashboard")}
        >
          <img height={"150px"} width={"150px"} src={logo} alt="Logo" />
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuList.map((menu) => (
          <ListItem key={menu.name} disablePadding>
            <ListItemButton onClick={menu.onClick}>
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    // <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ecd8cc' }}>
    //   <Header />
    //   <Container component="main" sx={{ flexGrow: 1, py: 4 }} style={{ minHeight: '100vh' }}>
    //     <Outlet />
    //   </Container>
    // </Box>

    <Box
      sx={{ display: "flex", backgroundColor: "#ecd8cc", minHeight: "100vh" }}
    >
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#ecd8cc",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* For mobile screens */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* For desktop screens */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            backgroundColor: "#ecd8cc",
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
