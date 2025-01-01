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
        { id: 'display_id', label: 'Order ID', align: 'left', sortable: true },
        { id: 'customer_name', label: 'Customer Name', align: 'left', sortable: true },
        { id: 'status', label: 'Status', align: 'left', sortable: false },
        { id: 'created_at', label: 'Created At', align: 'left', sortable: true },
        { id: 'total', label: 'Total Amount', align: 'right', sortable: true },
        { id: 'actions', label: 'Actions', align: 'center', sortable: false },
    ];

    // Columns for the details table
    const detailsTableColumns = [
        { id: 'product', label: 'Product ID', width: '10%', align: 'left' },
        { id: 'product_name', label: 'Product Name', width: '30%', align: 'left' },
        { 
            id: 'product_image', 
            label: 'Product Image', 
            width: '30%', 
            align: 'left', 
            render: (value) => <img src={value} alt="Product" style={{ maxWidth: '100px' }} />
        },
        { id: 'quantity', label: 'Quantity', width: '10%', align: 'center' },
        { id: 'price', label: 'Price', width: '10%', align: 'center' },
        { id: 'total', label: 'Total', width: '10%', align: 'center' },
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

    const updateOrderStatus = async (orderId, newStatus, displayId) => {
        try {
            const updatedOrder = orders.find(order => order.id === orderId);

            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

            await orderService.updateOrder(orderId, { status: newStatus });
    
            const orderDisplayId = updatedOrder?.display_id;
            setNotification({ open: true, message: `Order ${orderDisplayId} status updated to ${newStatus.toUpperCase()}` });
        } catch (error) {
            console.error('Error updating order status:', error);

            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId ? { ...order, status: prevOrders.find(o => o.id === orderId)?.status } : order
                )
            );

            setNotification({ open: true, message: 'Error updating order status' });
        }
    };

    const sortedOrders = React.useMemo(() => {
        return orders.sort((a, b) => {
            return a.display_id - b.display_id;
        });
    }, [orders]);

    const currentPageOrders = sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => ({
        display_id: order.display_id,
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
                    product_name: item.product_name,
                    product_image: item.product_image,
                    quantity: item.quantity,
                    price: item.price,
                    total: (item.price * item.quantity).toFixed(2),
                }))} />
        ),
        actions: (
            <Box sx={{ display: 'flex', justifyContent: 'left', gap: 1 }}>
              <Button
                variant="outlined"
                sx={{ color: '#DC143C', borderColor: '#DC143C' }}
                startIcon={<DeleteIcon />}
                onClick={() => onDeleteOrder(order.id, order.display_id)}
              >
                Delete
              </Button>
            </Box>
          )
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