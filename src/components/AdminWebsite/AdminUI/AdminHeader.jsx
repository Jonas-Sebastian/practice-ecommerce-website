  import React from 'react';
  import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
  import MenuIcon from '@mui/icons-material/MenuRounded';
  import MenuOpenIcon from '@mui/icons-material/MenuOpenRounded';
  import { useNavigate } from 'react-router-dom';

  export default function AdminHeader({ onMenuClick, isDrawerOpen, onLogout }) {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
      navigate('/admin/main');
    };

    return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              sx={{ mr: 2 }}
            >
              {isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <Typography 
              variant="h6" 
              onClick={handleDashboardClick}
              sx={{ cursor: 'pointer' }}
            >
              Admin Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button sx={{ paddingX: '1vw', height: '5vh',  fontSize: 'h6.fontSize', textTransform: 'none'}} color="inherit" onClick={onLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
