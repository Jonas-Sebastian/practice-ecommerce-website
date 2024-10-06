import React, { useState } from 'react';
import GenericTable from '../AdminReusableComponents/GenericTable';
import { Button, Checkbox } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import userServiceInstance from '../../../services/UserService';

export default function AdminUserTable({ users, setUsers, onDeleteUser }) {
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

    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
    });

    const handleRoleChange = async (userId, roleType, isChecked) => {
        const userToUpdate = users.find(user => user.id === userId);
        if (!userToUpdate) return;

        const updateData = {
            email: userToUpdate.email,
            username: userToUpdate.username,
            [roleType]: isChecked,
        };

        try {
            await userServiceInstance.updateUser(userId, updateData);
            // Update the users array locally
            const updatedUsers = users.map(user =>
                user.id === userId ? { ...user, [roleType]: isChecked } : user
            );
            setUsers(updatedUsers); // Update state immediately
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    const columns = [
        { id: 'display_id', label: 'ID', sortable: true, sx: { width: '5%' } },
        { id: 'username', label: 'Name', sortable: true, sx: { width: '30%' } },
        { id: 'email', label: 'Email', sortable: true, sx: { width: '35%' } },
        { id: 'is_staff', label: 'Staff', sortable: false, sx: { width: '10%', textAlign: 'center' } },
        { id: 'is_admin', label: 'Admin', sortable: false, sx: { width: '10%', textAlign: 'center' } },
        { id: 'actions', label: 'Actions', sortable: false, sx: { width: '10%', textAlign: 'center' } },
    ];

    const data = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => ({
        display_id: user.display_id,
        username: user.username,
        email: user.email,
        is_staff: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Checkbox
                    checked={user.is_staff}
                    onChange={(e) => handleRoleChange(user.id, 'is_staff', e.target.checked)}
                />
            </div>
        ),
        is_admin: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Checkbox
                    checked={user.is_admin}
                    onChange={(e) => handleRoleChange(user.id, 'is_admin', e.target.checked)}
                />
            </div>
        ),
        actions: (
            <div style={{ textAlign: 'center' }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDeleteUser(user.id)}
                >
                    Delete
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
                count: users.length,
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
