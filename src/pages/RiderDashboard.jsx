import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Truck, MapPin, Clock, DollarSign, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RiderDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isAvailable, setIsAvailable] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Mock Assigned Orders
    const assignedOrders = [
        { id: 'ORD-002', type: 'Pickup', address: '123 Main St, Apt 4B', time: '10:00 AM', status: 'Pending' },
        { id: 'ORD-005', type: 'Delivery', address: '456 Oak Ave', time: '02:00 PM', status: 'In Progress' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <Truck className="h-6 w-6" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Rider Portal</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-sm font-medium text-gray-600">{isAvailable ? 'Online' : 'Offline'}</span>
                        <button
                            onClick={() => setIsAvailable(!isAvailable)}
                            className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                        >
                            Toggle
                        </button>
                    </div>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm mb-1">Total Deliveries</div>
                        <div className="text-2xl font-bold text-gray-900">145</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm mb-1">Today's Tasks</div>
                        <div className="text-2xl font-bold text-blue-600">8</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm mb-1">Total Earnings</div>
                        <div className="text-2xl font-bold text-green-600">$1,250</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm mb-1">Rating</div>
                        <div className="text-2xl font-bold text-yellow-500">4.9 ★</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Task List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Assigned Tasks Today</h2>
                        {assignedOrders.map((order) => (
                            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-full ${order.type === 'Pickup' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                        <Truck className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-gray-900">{order.type} Task</span>
                                            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">{order.status}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm flex items-center gap-1">
                                            <MapPin className="h-3 w-3" /> {order.address}
                                        </p>
                                        <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                            <Clock className="h-3 w-3" /> Due by {order.time}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 font-medium text-sm">
                                        Details
                                    </button>
                                    <button className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                                        Mark Done
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Salary / Earnings Card */}
                    <div className="bg-white h-fit rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Base Salary Info</h2>
                            <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                <span className="text-gray-600">Monthly Base</span>
                                <span className="font-bold text-gray-900">$2,500.00</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                <span className="text-gray-600">Commission Rate</span>
                                <span className="font-bold text-gray-900">5% per delivery</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-gray-900 font-bold">Projected Total</span>
                                <span className="font-bold text-green-600 text-lg">$3,125.00</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium">
                            View Payslips
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
