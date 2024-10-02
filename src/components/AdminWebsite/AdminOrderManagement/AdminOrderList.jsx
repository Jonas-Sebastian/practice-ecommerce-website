import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AdminOrderTable from './AdminOrderTable';  // Already named appropriately
import orderServiceInstance from '../../../services/OrderService';  // Use the correct service

export default function AdminOrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderServiceInstance.getOrders();  // Fetch orders instead of products
            setOrders(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleEditOrder = (orderId) => {
        console.log('Edit order:', orderId);
        window.location.href = `/admin/orders/${orderId}`;  // Adjust the route for orders
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await orderServiceInstance.deleteOrder(orderId);  // Delete order instead of product
                fetchOrders(); // Refresh the order list after deletion
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    return (
        <Box>
            <h2>Order List</h2>
            <AdminOrderTable 
                orders={orders}  // Pass orders instead of products
                onEditOrder={handleEditOrder} 
                onDeleteOrder={handleDeleteOrder} 
            />
        </Box>
    );
}
