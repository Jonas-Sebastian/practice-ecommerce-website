import React, { useState, useEffect } from 'react';
import CollapsibleTable from '../AdminReusableComponents/CollapsibleTable';
import { Button, Box, CircularProgress, FormControl, Select, MenuItem, Snackbar } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import CollapsibleTableDetails from '../AdminReusableComponents/CollapsibleTableDetails';
import orderService from '../../../services/OrderService';

export default function AdminOrderTable({ orders, setOrders, onDeleteOrder, loading }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusOptions, setStatusOptions] = useState([]);
    const [notification, setNotification] = useState({ open: false, message: '' });

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

    // Fetch status options from the backend
    useEffect(() => {
        const fetchStatusChoices = async () => {
            try {
                const response = await orderService.getStatusChoices();
                setStatusOptions(response);
            } catch (error) {
                console.error('Error fetching status choices:', error);
            }
        };

        fetchStatusChoices();
    }, []);

    const calculateTotalAmount = (items) => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

            await orderService.updateOrder(orderId, { status: newStatus });

            // Show notification of successful update
            setNotification({ open: true, message: `Order ${orderId} status updated to ${newStatus}` });
        } catch (error) {
            console.error('Error updating order status:', error);

            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId ? { ...order, status: prevOrders.find(o => o.id === orderId).status } : order
                )
            );

            setNotification({ open: true, message: 'Error updating order status' });
        }
    };

    const currentPageOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => ({
        id: order.id,
        customer_name: order.customer_name,
        status: (
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <Select
                    value={order.status || 'Pending'}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                        const newStatus = e.target.value;
                        updateOrderStatus(order.id, newStatus);
                    }}
                >
                    {statusOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        ),
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
                }))} />
        ),
    }));

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <CollapsibleTable
                columns={orderTableColumns}
                data={currentPageOrders.map(order => ({
                    ...order,
                    actions: (
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
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
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
            />
        </>
    );
};