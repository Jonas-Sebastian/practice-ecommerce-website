import React, { useState } from 'react';
import GenericTable from '../AdminReusableComponents/GenericTable';
import { Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export default function AdminCategoryTable({ categories, onEditCategory, onDeleteCategory }) {
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

    const sortedCategories = [...categories].sort((a, b) => {
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
        { id: 'id', label: 'ID', sortable: true, sx: { width: '10%' } },
        { id: 'name', label: 'Category Name', sortable: true, sx: { width: '30%' } },
        { id: 'description', label: 'Description', sortable: false, sx: { width: '40%' } },
        { id: 'actions', label: 'Actions', sortable: false, sx: { width: '20%', textAlign: 'center' } },
    ];

    const data = sortedCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        actions: (
            <div style={{ textAlign: 'center' }}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEditCategory(category.id)}
                    sx={{ mr: 1 }}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDeleteCategory(category.id)}
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
                count: categories.length,
                rowsPerPage,
                page,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
