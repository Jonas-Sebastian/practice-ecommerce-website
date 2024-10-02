import React, { useState } from 'react';
import CollapsibleTable from '../AdminReusableComponents/CollapsibleTable';
import { Button, Box, CircularProgress } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import CollapsibleTableDetails from '../AdminReusableComponents/CollapsibleTableDetails';

export default function AdminOrderTable ({ orders, onEditOrder, onDeleteOrder, loading }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Columns for the main order table
    const orderTableColumns = [
        { id: 'id', label: 'Order ID', align: 'left', sortable: true },
        { id: 'customer_name', label: 'Customer Name', align: 'left', sortable: true },
        { id: 'status', label: 'Status', align: 'left', sortable: true },
        { id: 'created_at', label: 'Created At', align: 'left', sortable: true },
        { id: 'total', label: 'Total Amount', align: 'right', sortable: true },
        { id: 'actions', label: 'Actions', align: 'center', sortable: false },
    ];

    // Columns for the details table
    const detailsTableColumns = [
        { id: 'product', label: 'Product ID', width: '40%', align: 'left' },
        { id: 'quantity', label: 'Quantity', width: '20%', align: 'center' },
        { id: 'price', label: 'Price', width: '20%', align: 'right' },
        { id: 'total', label: 'Total', width: '20%', align: 'right' },
    ];

    const calculateTotalAmount = (items) => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    const currentPageOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => ({
        id: order.id,
        customer_name: order.customer_name,
        status: order.status || 'Pending',
        created_at: new Date(order.created_at).toLocaleDateString(),
        total: calculateTotalAmount(order.order_items),
        details: (
            <CollapsibleTableDetails
                title="Order Contents"
                columns={detailsTableColumns}
                items={order.order_items.map(item => ({
                    product: item.product,
                    quantity: item.quantity,
                    price: item.price,
                    total: (item.price * item.quantity).toFixed(2),
                }))}
            />
        ),
    }));

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <CollapsibleTable
            columns={orderTableColumns}
            data={currentPageOrders.map(order => ({
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