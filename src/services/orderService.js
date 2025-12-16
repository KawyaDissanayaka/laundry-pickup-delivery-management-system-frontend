import api from './api';

const ENDPOINT = '/api/orders';

export const orderService = {
    // Get all orders (Admin/Staff)
    getAllOrders: async () => {
        try {
            const response = await api.get(ENDPOINT);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders', error);
            return [];
        }
    },

    // Get orders by Customer ID (User ID)
    getOrdersByCustomer: async (userId) => {
        try {
            const response = await api.get(`${ENDPOINT}/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching customer orders', error);
            return [];
        }
    },

    // Get orders by Staff ID (for Drivers/Processors)
    getOrdersByStaff: async (staffId) => {
        try {
            const response = await api.get(`${ENDPOINT}?staffId=${staffId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching staff orders', error);
            return [];
        }
    },

    // Update order status
    updateOrderStatus: async (orderId, status) => {
        try {
            const response = await api.put(`${ENDPOINT}/${orderId}/status?status=${status}`);
            return response.data;
        } catch (error) {
            console.error('Error updating order status', error);
            throw error;
        }
    },

    // Update generic order details
    updateOrder: async (orderId, updates) => {
        try {
            const response = await api.put(`${ENDPOINT}/${orderId}`, updates);
            return response.data;
        } catch (error) {
            console.error('Error updating order', error);
            throw error;
        }
    },

    // Update order progress/status
    updateOrderProgress: async (orderId, progressDetails) => {
        // progressDetails: { step: string, note: string, completion: number }
        return orderService.updateOrder(orderId, { progress: progressDetails });
    },

    // Create a new order
    createOrder: async (newOrder) => {
        try {
            const response = await api.post(ENDPOINT, newOrder);
            return response.data;
        } catch (error) {
            console.error('Error creating order', error);
            throw error;
        }
    }
};

