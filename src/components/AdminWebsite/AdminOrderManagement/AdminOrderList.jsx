import React, { useState, useEffect } from 'react';
import { Box, Snackbar } from '@mui/material';
import AdminOrderTable from './AdminOrderTable';
import orderServiceInstance from '../../../services/OrderService';

export default function AdminOrderList() {
    const [orders, setOrders] = useState([]);
    const [notification, setNotification] = useState({ open: false, message: '' });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderServiceInstance.getOrders();
            setOrders(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setNotification({ open: true, message: 'Error fetching orders.' });
        }
    };

    const handleDeleteOrder = async (orderId, displayId) => {
        if (window.confirm(`Are you sure you want to delete this order (ID: ${displayId})?`)) {
            try {
                await orderServiceInstance.deleteOrder(orderId);
                fetchOrders();
                setNotification({ open: true, message: `Order ${displayId} has been successfully deleted.` });
            } catch (error) {
                console.error('Error deleting order:', error);
                setNotification({ open: true, message: `Error deleting order ${displayId}.` });
            }
        }
    };

    return (
        <Box>
            <h2>Order List</h2>
            <AdminOrderTable 
                orders={orders} 
                setOrders={setOrders}
                onDeleteOrder={handleDeleteOrder} 
            />
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
            />
        </Box>
    );
}
