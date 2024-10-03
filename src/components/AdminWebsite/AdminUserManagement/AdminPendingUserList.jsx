import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AdminPendingUserTable from './AdminPendingUserTable';
import userServiceInstance from '../../../services/UserService';

export default function AdminPendingUserList() {
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            const response = await userServiceInstance.getAllUsers();
            // Filter users where is_approved is false
            const filteredUsers = response.data.filter(user => !user.is_approved);
            setPendingUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <Box>
            <h2>Pending User Requests</h2>
            <AdminPendingUserTable pendingUsers={pendingUsers} setPendingUsers={setPendingUsers} />
        </Box>
    );
}
