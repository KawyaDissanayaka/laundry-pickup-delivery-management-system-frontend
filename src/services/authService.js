import api from './api';

export const authService = {
    // Register a new user
    register: async (userData) => {
        try {
            const response = await api.post('/users/register', userData);
            return { success: true, data: response.data };
        } catch (error) {
            // Backend returns error message in response.data.message
            const message = error.response?.data?.message || error.message || 'Registration failed';
            return { success: false, error: message };
        }
    },

    // Login user
    login: async (email, password) => {
        try {
            const response = await api.post('/users/login', { email, password });
            return { success: true, data: response.data };
        } catch (error) {
            // Backend returns error message in response.data.message
            const message = error.response?.data?.message || error.message || 'Login failed';
            return { success: false, error: message };
        }
    }
};

