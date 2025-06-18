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
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import logo from "@assets/memoir.png";
import { useAuth } from "@contexts/AuthContext";
import { useToast } from "@contexts/ToastContext";

const drawerWidth = 240;

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { openToast, handleSetMessage } = useToast();
  
  const handleLogout = () => {
    handleSetMessage("You have been logged out successfully.");
    openToast();
    logout();
    navigate("/login");
  };

  const menuList = [
    {
      name: "Posts",
      icon: <DashboardIcon />,
      onClick: () => navigate('/app/posts'),
    },
    {
      name: "Profile",
      icon: <AccountBoxIcon />,
      onClick: () => navigate('/app/profile'),
    },
    {
      name: "Community",
      icon: <Diversity3Icon />,
      onClick: () => navigate('/app/community'),
    },
    {
      name: "Logout",
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
          onClick={() => navigate("/app/posts")}
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
