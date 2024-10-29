import React, { useState } from 'react';
import GenericTable from '../AdminReusableComponents/GenericTable';
import { Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from '@mui/icons-material';

export default function AdminProductTable({ products, categories, onEditProduct, onDeleteProduct }) {
    const [zoomedImages, setZoomedImages] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const toggleZoom = (id) => {
        setZoomedImages((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedProducts = [...products].sort((a, b) => {
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
        { id: 'display_id', label: 'ID', sortable: true, sx: { width: '3%' } },
        { id: 'image', label: 'Image', sortable: false, sx: { width: '12%' } },
        { id: 'name', label: 'Name', sortable: true, sx: { width: '15%' } },
        { id: 'category', label: 'Category', sortable: true, sx: { width: '10%' } },
        { id: 'price', label: 'Price', sortable: true, sx: { width: '5%' } },
        { id: 'stock', label: 'Stock', sortable: true, sx: { width: '5%' } },
        { id: 'description', label: 'Description', sortable: false, sx: { width: '35%' } },
        { id: 'actions', label: 'Actions', sortable: false, sx: { width: '15%', textAlign: 'center' } },
    ];

    const categoryMap = Object.fromEntries(categories.map(category => [category.id, category.name]));

    const data = sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => ({
        display_id: product.display_id,
        image: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: zoomedImages[product.id] ? '80%' : '30%',
                        height: 'auto',
                        transition: 'width 0.3s ease',
                    }}
                />
                <Button onClick={() => toggleZoom(product.id)} sx={{ marginLeft: 1, minWidth: '20%' }}>
                    {zoomedImages[product.id] ? <ZoomOutIcon /> : <ZoomInIcon />}
                </Button>
            </div>
        ),
        name: product.name,
        category: categoryMap[product.category] || 'Unknown',
        price: product.price,
        stock: product.stock,
        description: product.description,
        actions: (
            <div style={{ textAlign: 'center' }}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEditProduct(product.id)}
                    sx={{ mr: 1 }}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDeleteProduct(product.id)}
                >
                    Delete
                </Button>
            </div>
        )
    }));

    return (
        <GenericTable
            columns={columns}
            data={data}
            onSort={requestSort}
            pagination={{
                count: products.length,
                rowsPerPage,
                page
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
