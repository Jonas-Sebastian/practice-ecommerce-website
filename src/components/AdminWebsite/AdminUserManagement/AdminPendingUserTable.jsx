import React, { useState } from 'react';
import GenericTable from '../AdminReusableComponents/GenericTable';
import { Button } from '@mui/material';
import { Check as ApproveIcon, Close as DenyIcon } from '@mui/icons-material';
import userServiceInstance from '../../../services/UserService';

export default function AdminPendingUserTable({ pendingUsers, setPendingUsers, onDenyUser }) {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = [...pendingUsers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
    });

    const handleApproveUser = async (userId) => {
        const userToUpdate = pendingUsers.find(user => user.id === userId);
        if (!userToUpdate) return;

        const updateData = {
            email: userToUpdate.email,
            username: userToUpdate.username,
            is_approved: true,
        };

        try {
            await userServiceInstance.updateUser(userId, updateData);
            // Update the pending users array locally
            const updatedUsers = pendingUsers.filter(user => user.id !== userId);
            setPendingUsers(updatedUsers);
        } catch (error) {
            console.error('Error approving user:', error.response ? error.response.data : error.message);
        }
    };

    const handleDenyUser = async (userId) => {
        const userToDelete = pendingUsers.find(user => user.id === userId);
        if (!userToDelete) return;

        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await userServiceInstance.deleteUser(userId);
                const updatedUsers = pendingUsers.filter(user => user.id !== userId);
                setPendingUsers(updatedUsers);
            } catch (error) {
                console.error('Error deleting user:', error.response ? error.response.data : error.message);
            }
        }
    };
    

    const columns = [
        { id: 'id', label: 'ID', sortable: true, sx: { width: '5%' } },
        { id: 'username', label: 'Name', sortable: true, sx: { width: '30%' } },
        { id: 'email', label: 'Email', sortable: true, sx: { width: '35%' } },
        { id: 'actions', label: 'Actions', sortable: false, sx: { width: '30%', textAlign: 'center' } },
    ];

    const data = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        actions: (
            <div style={{ textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ApproveIcon />}
                    onClick={() => handleApproveUser(user.id)}
                >
                    Approve
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DenyIcon />}
                    onClick={() => handleDenyUser(user.id)}
                    style={{ marginLeft: '8px' }}
                >
                    Deny
                </Button>
            </div>
        ),
    }));

    return (
        <GenericTable
            columns={columns}
            data={data}
            onSort={requestSort}
            pagination={{
                count: pendingUsers.length,
                rowsPerPage,
                page,
            }}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
            }}
        />
    );
}
