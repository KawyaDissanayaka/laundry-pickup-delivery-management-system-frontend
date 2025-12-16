import api from './api';

export const serviceItemService = {
    // Get all service items
    getAllServices: async () => {
        try {
            const response = await api.get('/api/services');
            return response.data;
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    },

    // Add a new service item
    addService: async (serviceData) => {
        try {
            const response = await api.post('/api/services', serviceData);
            return response.data;
        } catch (error) {
            console.error('Error adding service:', error);
            throw error;
        }
    }
};
