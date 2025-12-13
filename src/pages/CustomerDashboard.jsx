import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    User,
    Plus,
    LogOut,
    MapPin,
    Phone,
    Mail,
    Clock,
    CheckCircle,
    DollarSign,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatusBadge = ({ status }) => {
    const colors = {
        'In Progress': 'bg-blue-100 text-blue-800',
        'Scheduled': 'bg-purple-100 text-purple-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

const OverviewTab = ({ stats, recentOrders, setActiveTab }) => (
    <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Orders</p>
                        <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Active Orders</p>
                        <h3 className="text-2xl font-bold mt-1 text-orange-600">{stats.activeOrders}</h3>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                        <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Completed</p>
                        <h3 className="text-2xl font-bold mt-1 text-green-600">{stats.completedOrders}</h3>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Total Spent</p>
                        <h3 className="text-2xl font-bold mt-1">${stats.totalSpent.toFixed(2)}</h3>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                <button
                    onClick={() => setActiveTab('orders')}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700 hover:underline"
                >
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Pickup</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{order.service} ({order.items} items)</td>
                                <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                                <td className="px-6 py-4 text-sm text-gray-600">{order.pickup}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">${order.total.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const OrdersTab = ({ recentOrders }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">All Orders</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.service}</td>
                            <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">${order.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ProfileTab = ({ user }) => (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-500">Member since Dec 2024</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Email Address</p>
                        <p className="text-gray-900">{user?.email}</p>
                    </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                        <p className="text-gray-900">+1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Default Address</p>
                        <p className="text-gray-900">123 Main Street, Apt 4B<br />New York, NY 10001</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
                <button className="text-blue-600 font-medium hover:text-blue-700 hover:underline">
                    Edit Profile Information
                </button>
            </div>
        </div>
    </div>
);

const NewOrderModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">Schedule Pickup</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form className="p-6 space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    onClose();
                    alert("Order Scheduled Successfully! (This is a mock)");
                }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                        <select className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                            <option>Wash & Fold</option>
                            <option>Dry Cleaning</option>
                            <option>Ironing Only</option>
                            <option>Household Items</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                            <input type="date" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                            <select className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>Morning (8-12)</option>
                                <option>Afternoon (12-4)</option>
                                <option>Evening (4-8)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Items</label>
                        <input type="number" placeholder="e.g., 2 bags" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" min="1" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                        <textarea rows="3" placeholder="Gate code, specific detergent, etc." className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
                        >
                            Schedule Pickup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LaundryDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    // Mock Data
    const stats = {
        totalOrders: 12,
        activeOrders: 2,
        completedOrders: 10,
        totalSpent: 450.00
    };

    const recentOrders = [
        { id: 'ORD-001', service: 'Wash & Fold', items: 15, total: 25.00, status: 'In Progress', date: '2024-03-10', pickup: '2024-03-10 10:00 AM' },
        { id: 'ORD-002', service: 'Dry Clean', items: 3, total: 45.00, status: 'Scheduled', date: '2024-03-12', pickup: '2024-03-12 02:00 PM' },
        { id: 'ORD-003', service: 'Wash & Iron', items: 8, total: 32.50, status: 'Delivered', date: '2024-03-05', pickup: '2024-03-05 09:00 AM' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                LaundryHub
                            </span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2 text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">{user?.name || 'Guest'}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Action Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
                        <p className="text-gray-500 mt-1">Here's what's happening with your laundry today.</p>
                    </div>
                    <button
                        onClick={() => setIsOrderModalOpen(true)}
                        className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md active:transform active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-semibold">New Order</span>
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-fit mb-8">
                    {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'orders', label: 'My Orders', icon: ShoppingBag },
                        { id: 'profile', label: 'Profile', icon: User },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                ${activeTab === tab.id
                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }
                            `}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {activeTab === 'overview' && (
                        <OverviewTab
                            stats={stats}
                            recentOrders={recentOrders}
                            setActiveTab={setActiveTab}
                        />
                    )}
                    {activeTab === 'orders' && (
                        <OrdersTab
                            recentOrders={recentOrders}
                        />
                    )}
                    {activeTab === 'profile' && (
                        <ProfileTab
                            user={user}
                        />
                    )}
                </div>
            </div>

            {/* Modals */}
            <NewOrderModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
            />
        </div>
    );
};

export default LaundryDashboard;
