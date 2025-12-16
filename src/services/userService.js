import api from './api';

export const userService = {
    // Get all users
    getAllUsers: async () => {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    },

    // Get user by ID
    getUserById: async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    // Get user by email
    getUserByEmail: async (email) => {
        try {
            const response = await api.get(`/users/email/${email}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            return null;
        }
    },

    // Update user
    updateUser: async (id, userData) => {
        try {
            const response = await api.put(`/users/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    // Delete user
    deleteUser: async (id) => {
        try {
            await api.delete(`/users/${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
};
