import React, { useState } from 'react';
import CollapsibleTable from '../AdminReusableComponents/CollapsibleTable';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export default function AdminOrderTable ({ orders, onEditOrder, onDeleteOrder, loading }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const calculateTotalAmount = (items) => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => ({
        id: order.id,
        customer_name: order.customer_name,
        status: order.status || 'Pending',
        created_at: new Date(order.created_at).toLocaleDateString(),
        total: calculateTotalAmount(order.order_items),
        details: (
        <Box sx={{ margin: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>Order Items:</Typography>
            {order.order_items.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, borderBottom: '1px solid #e0e0e0' }}>
                <Typography>Product ID: {item.product}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Price: ${item.price}</Typography>
                <Typography>Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
            ))}
        </Box>
        ),
    }));

    if (loading) {
        return <CircularProgress />;
    }

    const columns = [
        { id: 'id', label: 'Order ID', align: 'left', sortable: true },
        { id: 'customer_name', label: 'Customer Name', align: 'left', sortable: true },
        { id: 'status', label: 'Status', align: 'left', sortable: true },
        { id: 'created_at', label: 'Created At', align: 'left', sortable: true },
        { id: 'total', label: 'Total Amount', align: 'right', sortable: true },
        { id: 'actions', label: 'Actions', align: 'center', sortable: false },
    ];

    return (
        <CollapsibleTable
        columns={columns}
        data={paginatedOrders.map(order => ({
            ...order,
            actions: (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => onEditOrder(order.id)}
                sx={{ mr: 1 }}
                >
                Edit
                </Button>
                <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => onDeleteOrder(order.id)}
                >
                Delete
                </Button>
            </Box>
            ),
        }))}
        totalCount={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        }}
        />
    );
};