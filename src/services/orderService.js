import api from './api';

const ENDPOINT = '/orders';
const CUSTOMER_ENDPOINT = '/customer/orders';
const EMPLOYEE_ENDPOINT = '/employee/orders';
const RIDER_ENDPOINT = '/rider/orders';
const ADMIN_ENDPOINT = '/admin/orders';

// Map backend status codes to frontend-friendly codes and labels
const mapStatusFromBackend = (rawStatus) => {
    if (!rawStatus) {
        return { code: 'PLACED', label: 'Placed' };
    }

    const code = String(rawStatus).toUpperCase();

    switch (code) {
        case 'PLACED':
            return { code, label: 'Placed' };
        case 'ASSIGNED':
            return { code, label: 'Rider Assigned' };
        case 'AT_LAUNDRY':
            return { code, label: 'At Laundry' };
        case 'PROCESSING':
            return { code, label: 'Cleaning' };
        case 'READY':
            return { code, label: 'Ready' };
        case 'DELIVERED':
            return { code, label: 'Delivered' };
        case 'COMPLETED':
            return { code, label: 'Completed' };
        case 'CANCELLED':
            return { code, label: 'Cancelled' };
        default:
            // Fall back to original value for unknown codes
            return { code, label: rawStatus };
    }
};

const safeParseJSON = (value) => {
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch (e) {
        console.warn('Failed to parse progressNote JSON, returning raw string instead:', e);
        return { note: value };
    }
};

// Helper to transform backend order to frontend format
const transformOrder = (order) => {
    if (!order) return null;

    const { code: statusCode, label: statusLabel } = mapStatusFromBackend(order.status);

    // Derive pickup status from lifecycle status
    const isPicked =
        statusCode === 'AT_LAUNDRY' ||
        statusCode === 'PROCESSING' ||
        statusCode === 'READY' ||
        statusCode === 'DELIVERED' ||
        statusCode === 'COMPLETED';
    
    return {
        id: order.id,
        customerId: order.customer?.id ?? null,
        customerName: order.customer?.fullName || order.customer?.username || 'Unknown',
        items: order.items || [],
        totalAmount: order.totalAmount ?? 0,
        // statusCode is used for logic/filters, statusLabel for display
        status: statusCode,
        statusLabel,
        serviceType: order.serviceType,
        pickupStatus: isPicked ? 'PICKED' : 'NOT_PICKED',
        // We only persist createdAt/completedAt in the backend, so map logically
        pickupDate: order.createdAt,
        deliveryDate: order.completedAt,
        completedAt: order.completedAt,
        driverId: order.rider?.id ?? null,
        staffId: order.employee?.id ?? null,
        address: order.address || order.customer?.address || '',
        progress: order.progressNote ? safeParseJSON(order.progressNote) : null,
        createdAt: order.createdAt
    };
};

export const orderService = {
    // Get all orders (Admin)
    getAllOrders: async () => {
        try {
            const response = await api.get(ADMIN_ENDPOINT);
            return Array.isArray(response.data) ? response.data.map(transformOrder) : [];
        } catch (error) {
            console.error('Error fetching orders', error);
            return [];
        }
    },

    // Get orders by Customer (uses customer endpoint)
    getOrdersByCustomer: async (customerId) => {
        try {
            const response = await api.get(CUSTOMER_ENDPOINT);
            return Array.isArray(response.data) ? response.data.map(transformOrder) : [];
        } catch (error) {
            console.error('Error fetching customer orders', error);
            return [];
        }
    },

    // Get orders by Employee
    getOrdersByStaff: async (staffId) => {
        try {
            const response = await api.get(EMPLOYEE_ENDPOINT);
            return Array.isArray(response.data) ? response.data.map(transformOrder) : [];
        } catch (error) {
            console.error('Error fetching staff orders', error);
            return [];
        }
    },

    // Get orders by Rider
    getOrdersByRider: async (riderId) => {
        try {
            const response = await api.get(RIDER_ENDPOINT);
            return Array.isArray(response.data) ? response.data.map(transformOrder) : [];
        } catch (error) {
            console.error('Error fetching rider orders', error);
            return [];
        }
    },

    // Get single order by ID
    getOrderById: async (orderId) => {
        try {
            const response = await api.get(`${ENDPOINT}/${orderId}`);
            return transformOrder(response.data);
        } catch (error) {
            console.error('Error fetching order', error);
            throw error;
        }
    },

    // Update generic order details
    updateOrder: async (orderId, updates) => {
        try {
            const response = await api.put(`${ENDPOINT}/${orderId}`, updates);
            return transformOrder(response.data);
        } catch (error) {
            console.error('Error updating order', error);
            throw error;
        }
    },

    // Update order status
    // role: 'admin' | 'employee' | 'rider'
    updateOrderStatus: async (orderId, status, role = 'admin') => {
        try {
            const basePath =
                role === 'employee'
                    ? EMPLOYEE_ENDPOINT
                    : role === 'rider'
                        ? RIDER_ENDPOINT
                        : ADMIN_ENDPOINT;

            const response = await api.put(`${basePath}/${orderId}/status`, { status });
            return transformOrder(response.data);
        } catch (error) {
            console.error('Error updating order status', error);
            throw error;
        }
    },

    // Update order progress/status (for employees)
    updateOrderProgress: async (orderId, progressDetails) => {
        try {
            const progressNote = typeof progressDetails === 'string' 
                ? progressDetails 
                : JSON.stringify(progressDetails);
            const response = await api.put(`${EMPLOYEE_ENDPOINT}/${orderId}/progress`, { progressNote });
            return transformOrder(response.data);
        } catch (error) {
            console.error('Error updating order progress', error);
            throw error;
        }
    },

    // Create a new order (customer)
    createOrder: async (newOrder) => {
        try {
            const response = await api.post(CUSTOMER_ENDPOINT, newOrder);
            return transformOrder(response.data);
        } catch (error) {
            console.error('Error creating order', error);
            throw error;
        }
    },

    // Assign employee to order (admin)
    assignEmployee: async (orderId, employeeId) => {
        try {
            const response = await api.post(`${ADMIN_ENDPOINT}/${orderId}/assign-employee`, { employeeId });
            return transformOrder(response.data);
        } catch (error) {
            console.error('Error assigning employee', error);
            throw error;
        }
    },

    // Assign rider to order (admin)
    assignRider: async (orderId, riderId) => {
        try {
            const response = await api.post(`${ADMIN_ENDPOINT}/${orderId}/assign-rider`, { riderId });
            return transformOrder(response.data);
        } catch (error) {
            console.error('Error assigning rider', error);
            throw error;
        }
    }
};
