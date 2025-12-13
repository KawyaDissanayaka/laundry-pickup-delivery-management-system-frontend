import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Role-based protection: Admins shouldn't see customer dashboard
    if (user?.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
}
