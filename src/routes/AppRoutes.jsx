import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import OrderDetail from '../pages/OrderDetail';
import CreateOrder from '../pages/CreateOrder';
import Tracking from '../pages/Tracking';
import Riders from '../pages/Riders';
import Customers from '../pages/Customers';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/new" element={<CreateOrder />} />
                <Route path="orders/:id" element={<OrderDetail />} />
                <Route path="tracking" element={<Tracking />} />
                <Route path="riders" element={<Riders />} />
                <Route path="customers" element={<Customers />} />
                <Route path="analytics" element={<div className="p-4">Analytics Comp</div>} />
                <Route path="settings" element={<div className="p-4">Settings Comp</div>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
