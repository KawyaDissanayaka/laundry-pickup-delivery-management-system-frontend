import { mockOrders } from '../data/mockOrders';

const ORDER_STORAGE_KEY = 'laundry_orders_v1';

// Initialize storage with mock data if empty
const initializeStorage = () => {
    if (!localStorage.getItem(ORDER_STORAGE_KEY)) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(mockOrders));
    }
};

export const orderService = {
    getAllOrders: () => {
        initializeStorage();
        return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY));
    },

    getOrdersByCustomer: (customerId) => {
        const orders = orderService.getAllOrders();
        return orders.filter(o => o.customerId === customerId);
    },

    getOrdersByStaff: (staffId) => {
        const orders = orderService.getAllOrders();
        return orders.filter(o => o.staffId === staffId);
    },

    updateOrder: (orderId, updates) => {
        const orders = orderService.getAllOrders();
        const updatedOrders = orders.map(order =>
            order.id === orderId
                ? { ...order, ...updates, lastUpdated: new Date().toISOString() }
                : order
        );
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
        return updatedOrders.find(o => o.id === orderId);
    },

    updateOrderProgress: (orderId, progressDetails) => {
        // progressDetails: { step: string, note: string, completion: number }
        return orderService.updateOrder(orderId, { progress: progressDetails });
    },

    createOrder: (newOrder) => {
        const orders = orderService.getAllOrders();
        const orderWithMeta = {
            ...newOrder,
            id: `ORD-${Date.now().toString().slice(-6)}`,
            status: 'Placed',
            placedAt: new Date().toISOString(),
            progress: { step: 'Placed', note: 'Order received', completion: 0 }
        };
        const updatedOrders = [orderWithMeta, ...orders];
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
        return orderWithMeta;
    }
};
