import React, { useState } from 'react';
import GenericTable from '../AdminReusableComponents/GenericTable';
import { Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export default function AdminUserTable({ users, onEditUser, onDeleteUser }) {
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
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { id: 'id', label: 'ID', sortable: true, sx: { width: '5%' } },
        { id: 'username', label: 'Name', sortable: true, sx: { width: '30%' } },
        { id: 'email', label: 'Email', sortable: true, sx: { width: '35%' } },
        { id: 'role', label: 'Role', sortable: true, sx: { width: '10%' } },
        { id: 'actions', label: 'Actions', sortable: false, sx: { width: '20%', textAlign: 'center' } },
    ];

    const data = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.is_admin ? 'Admin' : 'User',
        actions: (
            <div style={{ textAlign: 'center' }}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEditUser(user.id)}
                    sx={{ mr: 1 }}
                >
                    Edit
                </Button>
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
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
