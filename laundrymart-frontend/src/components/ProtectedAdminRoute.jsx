import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedAdminRoute({ children }) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    // Check for both lowercase and uppercase role (normalized to lowercase in AuthContext)
    if (user?.role !== 'admin' && user?.role !== 'ADMIN') {
        // If logged in but not admin (e.g. customer), redirect to home or show denied
        return <Navigate to="/" replace />;
    }

    return children;
}
