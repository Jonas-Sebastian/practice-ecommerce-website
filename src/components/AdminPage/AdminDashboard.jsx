import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Drawer, List, ListItem, ListItemText, ListItemButton, Divider, Button, Collapse, Typography } from '@mui/material';
import {
  DashboardRounded as DashboardIcon,
  ShoppingCartRounded as ShoppingCartIcon,
  BarChartRounded as BarChartIcon,
  DescriptionRounded as DescriptionIcon,
  LayersRounded as LayersIcon,
  ExpandLessRounded as ExpandLessIcon,
  ExpandMoreRounded as ExpandMoreIcon,
} from '@mui/icons-material';
import AdminHeader from './AdminHeader';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const CustomDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

//For future responsive design
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const NAV_ITEMS = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  {
    segment: 'reports', title: 'Reports', icon: <BarChartIcon />,
    children: [
      { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
    ],
  },
  { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  const handleDrawerToggle = () => {
    if (open) {
      // If closing the drawer, collapse any open reports section
      setOpenReports(false);
    }
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login'; // Redirect to login page
  };

  const handleClickReports = () => {
    setOpenReports(!openReports);
    if (!open) {
      setOpen(true); // Open the drawer if it is closed
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AdminHeader onMenuClick={handleDrawerToggle} isDrawerOpen={open}/>
        <CustomDrawer variant="permanent" open={open}>
          <List sx={{ marginTop: 8 }}>
            {NAV_ITEMS.map((item, index) => {
              if (item.kind === 'header') {
                return (
                  <ListItem key={index}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: open ? 'block' : 'none' }}>
                      {item.title}
                    </Typography>
                  </ListItem>
                );
              }
              if (item.kind === 'divider') {
                return <Divider key={index} />;
              }

              const hasChildren = item.children && item.children.length > 0;

              return (
                <React.Fragment key={index}>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton onClick={() => item.segment === 'reports' && handleClickReports()}>
                      {item.icon}
                      <ListItemText primary={item.title} sx={{ display: open ? 'block' : 'none' }} />
                      {hasChildren ? (openReports ? <ExpandLessIcon /> : <ExpandMoreIcon />) : null}
                    </ListItemButton>
                  </ListItem>
                  {hasChildren && (
                    <Collapse in={openReports} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((subItem, subIndex) => (
                          <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                            <ListItemButton onClick={() => window.location.href = `/admin/${subItem.segment}`}>
                              {subItem.icon}
                              <ListItemText primary={subItem.title} sx={{ display: open ? 'block' : 'none' }} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
            <Divider />
            {open && (
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </CustomDrawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Typography variant="h4">Welcome, Admin!</Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant="h6">Overview</Typography>
            <Typography>Total Sales: $5,000</Typography>
            <Typography>New Orders: 10</Typography>
            <Typography>Products in Stock: 50</Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>Manage Orders</Button>
            <Button variant="contained" color="secondary">Manage Products</Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
