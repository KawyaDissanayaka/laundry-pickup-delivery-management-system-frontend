import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, MapPin, CreditCard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar for Customer */}
            <nav className="bg-white shadow">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold text-blue-600">LaundryExpress</div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Welcome, {user?.name}</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-red-600 hover:text-red-700 font-medium"
                        >
                            <LogOut size={18} className="mr-2" /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Dashboard</h1>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                                <Package size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Active Orders</p>
                                <p className="text-2xl font-bold">2</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 text-green-600 rounded-full">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Default Address</p>
                                <p className="font-semibold text-gray-800">123 Main St, Apt 4B</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Saved Payment</p>
                                <p className="font-semibold text-gray-800">Visa ending 4242</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="font-bold text-gray-900">Recent Orders</h2>
                        <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm">
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Items</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* Mock User Data */}
                                <tr>
                                    <td className="px-6 py-4 font-medium">#ORD-2024-001</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Processing</span></td>
                                    <td className="px-6 py-4">3 Bags, 1 Duvet</td>
                                    <td className="px-6 py-4">$45.00</td>
                                    <td className="px-6 py-4 text-gray-500">Dec 12, 2024</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-medium">#ORD-2024-002</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Delivered</span></td>
                                    <td className="px-6 py-4">5 Shirts, 2 Pants</td>
                                    <td className="px-6 py-4">$32.50</td>
                                    <td className="px-6 py-4 text-gray-500">Dec 10, 2024</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
