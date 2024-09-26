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
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEditUser = (userId) => {
        console.log('Edit user:', userId);
        // Redirect to edit page or open a modal
        window.location.href = `/admin/user-registration/${userId}`; // Assuming this is your edit route
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
            <AdminUserTable users={users} onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />
        </Box>
    );
}
