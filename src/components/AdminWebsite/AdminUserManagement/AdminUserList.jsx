import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AdminUserTable from './AdminUserTable';
import userServiceInstance from '../../../services/UserService';

export default function AdminUserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userServiceInstance.getAllUsers();
            // Filter users where is_approved is true
            const approvedUsers = response.data.filter(user => user.is_approved);
            setUsers(approvedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userServiceInstance.deleteUser(userId);
                fetchUsers(); // Refresh the user list after deletion
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <Box>
            <h2>User List</h2>
            <AdminUserTable users={users} setUsers={setUsers} onDeleteUser={handleDeleteUser} />
        </Box>
    );
}
