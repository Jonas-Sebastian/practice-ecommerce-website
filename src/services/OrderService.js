import axios from 'axios';
import { API_URL_ORDERS } from './ApiService';

class OrderService {
    // Fetch all orders
    async getOrders() {
        try {
            const response = await axios.get(API_URL_ORDERS);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching orders: ' + error.message);
        }
    }

    // Fetch a single order by ID
    async getOrderById(orderId) {
        try {
            const response = await axios.get(`${API_URL_ORDERS}${orderId}/`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching order: ' + error.message);
        }
    }

    // Create a new order
    async createOrder(orderData) {
        try {
            const response = await axios.post(API_URL_ORDERS, orderData);
            return response.data;
        } catch (error) {
            throw new Error('Error creating order: ' + error.message);
        }
    }

    // Update an existing order
    async updateOrder(orderId, orderData) {
        try {
            const response = await axios.put(`${API_URL_ORDERS}${orderId}/`, orderData);
            return response.data;
        } catch (error) {
            throw new Error('Error updating order: ' + error.message);
        }
    }

    // Delete an order
    async deleteOrder(orderId) {
        try {
            await axios.delete(`${API_URL_ORDERS}${orderId}/`);
        } catch (error) {
            throw new Error('Error deleting order: ' + error.message);
        }
    }

    async getStatusChoices() {
        try {
            const response = await axios.get(`${API_URL_ORDERS}status-choices/`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching status choices: ' + error.message);
        }
    }
}

const orderServiceInstance = new OrderService();
export default orderServiceInstance;