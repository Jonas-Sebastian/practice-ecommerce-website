import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminDrawer from './AdminDrawer';
import { Box } from '@mui/material';

export default function AdminLayout() {
    const [open, setOpen] = useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login'; // Redirect to login page
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AdminHeader onMenuClick={handleDrawerToggle} isDrawerOpen={open} />
            <AdminDrawer open={open} onToggleDrawer={setOpen} onLogout={handleLogout} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
                <Outlet /> {/* Renders content based on nested route */}
            </Box>
        </Box>
    );
}
