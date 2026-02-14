import React, { useState, useEffect } from 'react';
import { Truck, Phone, UserMinus } from 'lucide-react';
import api from '../services/api';

export default function Riders() {
    const [riders, setRiders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [ridersResponse, customersResponse] = await Promise.all([
                    api.get('/admin/users/riders'),
                    api.get('/admin/users/customers')
                ]);
                setRiders(ridersResponse.data);
                setCustomers(customersResponse.data);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleDemoteToCustomer = async (riderId) => {
        if (!confirm('Are you sure you want to demote this rider to Customer?')) return;
        
        try {
            await api.put(`/admin/users/${riderId}/change-role`, {
                newRole: 'CUSTOMER'
            });
            
            // Reload data
            const [ridersResponse, customersResponse] = await Promise.all([
                api.get('/admin/users/riders'),
                api.get('/admin/users/customers')
            ]);
            setRiders(ridersResponse.data);
            setCustomers(customersResponse.data);
            
            alert('Rider demoted to Customer successfully!');
        } catch (error) {
            alert('Error demoting rider: ' + (error.response?.data?.message || error.message));
        }
    };

    const handlePromoteFromCustomer = async () => {
        if (!selectedCustomerId) return;
        
        try {
            await api.put(`/admin/users/${selectedCustomerId}/change-role`, {
                newRole: 'RIDER'
            });
            
            // Reload data
            const [ridersResponse, customersResponse] = await Promise.all([
                api.get('/admin/users/riders'),
                api.get('/admin/users/customers')
            ]);
            setRiders(ridersResponse.data);
            setCustomers(customersResponse.data);
            
            alert('Customer promoted to Rider successfully!');
            setIsModalOpen(false);
            setSelectedCustomerId('');
        } catch (error) {
            alert('Error promoting customer: ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading riders...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Rider Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <UserMinus className="h-4 w-4" /> Promote Customer
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {riders.length === 0 ? (
                    <div className="col-span-full bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center text-gray-500">
                        No riders found
                    </div>
                ) : (
                    riders.map((rider, index) => (
                        <div key={rider.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Truck className="h-6 w-6 text-gray-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{rider.fullName}</h3>
                                            <p className="text-xs text-gray-500">ID: {rider.username}</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                        Active
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        {rider.phone || 'N/A'}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="font-medium">{rider.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs text-gray-500 font-medium">Role: {rider.role}</span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => handleDemoteToCustomer(rider.id)} 
                                        className="text-red-600 hover:text-red-700"
                                        title="Demote to Customer"
                                    >
                                        <UserMinus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Promotion Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Promote Customer to Rider</h2>
                        
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
                                onClick={handlePromoteFromCustomer}
                                disabled={!selectedCustomerId}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Promote to Rider
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
