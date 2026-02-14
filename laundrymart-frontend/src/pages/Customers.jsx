import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Edit, Trash2, UserPlus } from 'lucide-react';
import api from '../services/api';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const response = await api.get('/admin/users/customers');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error loading customers:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCustomers();
    }, []);

    const handlePromoteToRider = async () => {
        if (!selectedCustomerId) return;
        
        try {
            await api.put(`/admin/users/${selectedCustomerId}/change-role`, {
                newRole: 'RIDER'
            });
            
            // Reload customers
            const response = await api.get('/admin/users/customers');
            setCustomers(response.data);
            
            alert('Customer promoted to Rider successfully!');
            setIsModalOpen(false);
            setSelectedCustomerId('');
        } catch (error) {
            alert('Error promoting customer: ' + (error.response?.data?.message || error.message));
        }
    };

    const handlePromoteToEmployee = async () => {
        if (!selectedCustomerId) return;
        
        try {
            await api.put(`/admin/users/${selectedCustomerId}/change-role`, {
                newRole: 'EMPLOYEE'
            });
            
            // Reload customers
            const response = await api.get('/admin/users/customers');
            setCustomers(response.data);
            
            alert('Customer promoted to Employee successfully!');
            setIsModalOpen(false);
            setSelectedCustomerId('');
        } catch (error) {
            alert('Error promoting customer: ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading customers...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                        <UserPlus className="h-4 w-4" /> Promote to Rider
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <UserPlus className="h-4 w-4" /> Promote to Employee
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Address</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No customers found
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                                                    {customer.fullName?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{customer.fullName}</div>
                                                    <div className="text-xs text-gray-500">{customer.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Mail className="h-3 w-3" /> {customer.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="h-3 w-3" /> {customer.phone || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3 w-3 text-gray-400" />
                                                {customer.address || 'No address provided'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {customer.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Promote to Rider">
                                                    <UserPlus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Promotion Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Promote Customer</h2>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Customer</label>
                            <select 
                                value={selectedCustomerId}
                                onChange={(e) => setSelectedCustomerId(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a customer to promote</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.fullName} ({customer.email})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handlePromoteToRider}
                                disabled={!selectedCustomerId}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Promote to Rider
                            </button>
                            <button
                                onClick={handlePromoteToEmployee}
                                disabled={!selectedCustomerId}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Promote to Employee
                            </button>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedCustomerId('');
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
