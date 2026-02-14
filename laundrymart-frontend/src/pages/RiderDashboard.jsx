import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Truck, MapPin, Clock, DollarSign, LogOut, CheckCircle, Navigation, Phone, Menu, X, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import api from '../services/api';

const RiderDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isAvailable, setIsAvailable] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [assignedOrders, setAssignedOrders] = useState([]);
    const [pendingPickupOrders, setPendingPickupOrders] = useState([]);
    const [stats, setStats] = useState({
        deliveries: 0,
        today: 0,
        earnings: 0
    });

    const confirmPickup = async (orderId) => {
        try {
            await api.post(`/rider/orders/${orderId}/confirm-pickup`);
            // Refresh data after confirming pickup
            const loadData = async () => {
                if (user?.id) {
                    // Load assigned orders
                    const orders = await orderService.getOrdersByRider(user.id);
                    const formatted = orders.map(order => ({
                        id: order.id,
                        type: order.status === 'READY' || order.status === 'DELIVERED' ? 'Delivery' : 'Pickup',
                        address: order.address || 'Address not provided',
                        time: order.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'N/A',
                        status: order.statusLabel || order.status,
                        statusCode: order.status,
                        customer: order.customerName || 'Unknown',
                        phone: '077 123 4567'
                    }));
                    setAssignedOrders(formatted);
                    
                    // Load unassigned PLACED orders
                    const pendingResponse = await api.get('/rider/dashboard/pending-pickup');
                    const pendingOrders = pendingResponse.data.map(order => ({
                        id: order.id,
                        type: 'Pickup',
                        address: order.address || 'Address not provided',
                        time: order.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'N/A',
                        status: order.status,
                        statusCode: order.status,
                        customer: order.customer?.fullName || 'Unknown',
                        phone: order.customer?.phone || '077 123 4567',
                        isUnassigned: true
                    }));
                    setPendingPickupOrders(pendingOrders);
                }
            };
            loadData();
        } catch (error) {
            console.error('Error confirming pickup:', error);
            alert('Failed to confirm pickup. Please try again.');
        }
    };

    useEffect(() => {
        const loadData = async () => {
            if (user?.id) {
                try {
                    // Load assigned orders
                    const orders = await orderService.getOrdersByRider(user.id);
                    const formatted = orders.map(order => ({
                        id: order.id,
                        type: order.status === 'READY' || order.status === 'DELIVERED' ? 'Delivery' : 'Pickup',
                        address: order.address || 'Address not provided',
                        time: order.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'N/A',
                        status: order.statusLabel || order.status,
                        statusCode: order.status,
                        customer: order.customerName || 'Unknown',
                        phone: '077 123 4567' // TODO: Get from customer data
                    }));
                    setAssignedOrders(formatted);
                    
                    // Load unassigned PLACED orders (available for pickup)
                    const pendingResponse = await api.get('/rider/dashboard/pending-pickup');
                    const pendingOrders = pendingResponse.data.map(order => ({
                        id: order.id,
                        type: 'Pickup',
                        address: order.address || 'Address not provided',
                        time: order.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'N/A',
                        status: order.status,
                        statusCode: order.status,
                        customer: order.customer?.fullName || 'Unknown',
                        phone: order.customer?.phone || '077 123 4567',
                        isUnassigned: true
                    }));
                    setPendingPickupOrders(pendingOrders);
                    
                    // Load dashboard stats (commission, pending orders)
                    const statsResponse = await api.get('/rider/dashboard/stats');
                    const statsData = statsResponse.data;
                    const completedCount = orders.filter(o => o.status === 'COMPLETED').length;

                    setStats({
                        deliveries: completedCount,
                        today: formatted.length + pendingOrders.length,
                        earnings: statsData.commission || 0
                    });
                } catch (error) {
                    console.error('Error loading rider data:', error);
                    // Set empty state on error
                    setAssignedOrders([]);
                    setPendingPickupOrders([]);
                    setStats({
                        deliveries: 0,
                        today: 0,
                        earnings: 0
                    });
                }
            }
        };
        loadData();
        const interval = setInterval(loadData, 10000); // Poll every 10 seconds
        return () => clearInterval(interval);
    }, [user?.id]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20 md:pb-0">
            {/* Mobile Header */}
            <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Truck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Rider Portal</h1>
                            <p className="text-slate-400 text-xs">{user?.name || 'Rider'}</p>
                        </div>
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-slate-800 rounded-full md:hidden">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isAvailable ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></span>
                            <span className={`text-sm font-medium ${isAvailable ? 'text-emerald-400' : 'text-red-400'}`}>{isAvailable ? 'Online' : 'Offline'}</span>
                        </div>
                        <button
                            onClick={() => setIsAvailable(!isAvailable)}
                            className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
                        >
                            Switch Status
                        </button>
                        <button onClick={() => { logout(); navigate('/'); }} className="text-red-400 hover:text-red-300">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-4 shadow-xl md:hidden animate-in slide-in-from-top-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center bg-slate-800 p-3 rounded-xl">
                                <span className="text-slate-300">Availability</span>
                                <button
                                    onClick={() => setIsAvailable(!isAvailable)}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${isAvailable ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}
                                >
                                    {isAvailable ? 'Go Offline' : 'Go Online'}
                                </button>
                            </div>
                            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 text-red-400 p-2">
                                <LogOut className="w-5 h-5" /> Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <div className="container mx-auto px-4 py-6 md:py-8 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-28">
                        <div className="bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center text-blue-600 mb-2">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-medium uppercase">Completed</p>
                            <p className="text-2xl font-bold text-slate-800">{stats.deliveries}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-28">
                        <div className="bg-purple-50 w-8 h-8 rounded-full flex items-center justify-center text-purple-600 mb-2">
                            <Clock className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-medium uppercase">Pending</p>
                            <p className="text-2xl font-bold text-slate-800">{stats.today}</p>
                        </div>
                    </div>
                    <div className="col-span-2 bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-lg shadow-emerald-200 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-white mb-2 z-10">
                            <Wallet className="w-4 h-4" />
                        </div>
                        <div className="z-10">
                            <p className="text-emerald-100 text-xs font-medium uppercase">Total Earnings</p>
                            <p className="text-3xl font-bold">LKR {stats.earnings.toLocaleString()}</p>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 rounded-full bg-white opacity-10"></div>
                        <div className="absolute bottom-0 right-10 -mb-4 w-12 h-12 rounded-full bg-white opacity-10"></div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Task List Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Pending Pickups */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                                Pending Pickups <span className="text-slate-400 text-sm font-normal">({pendingPickupOrders.length} available)</span>
                            </h2>

                            {pendingPickupOrders.length === 0 ? (
                                <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-100 border-dashed mb-4">
                                    <p>No pending pickups available.</p>
                                </div>
                            ) : (
                                pendingPickupOrders.map((order) => (
                                    <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative group overflow-hidden mb-4">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500"></div>

                                        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center relative z-10">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-green-50 text-green-600">
                                                    <Truck className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-slate-900 text-lg">New Pickup</h3>
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium border border-green-200">
                                                            Available
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-slate-600 text-sm flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {order.address}
                                                        </p>
                                                        <p className="text-slate-600 text-sm flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5 text-slate-400" /> Due: <span className="font-semibold text-slate-900">{order.time}</span>
                                                        </p>
                                                        <p className="text-slate-500 text-xs flex items-center gap-1.5 pt-1">
                                                            Cust: {order.customer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
                                                <button 
                                                    onClick={() => confirmPickup(order.id)}
                                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 active:scale-95 transition-all"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    Confirm Pickup
                                                </button>
                                                <a href={`tel:${order.phone.replace(/ /g, '')}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
                                                    <Phone className="w-4 h-4" />
                                                    Call
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Assigned Orders */}
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                My Assignments <span className="text-slate-400 text-sm font-normal">({assignedOrders.length} active)</span>
                            </h2>

                            {assignedOrders.length === 0 ? (
                                <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-100 border-dashed">
                                    <p>No active assignments right now.</p>
                                </div>
                            ) : (
                                assignedOrders.map((order) => (
                                    <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative group overflow-hidden">
                                        <div className={`absolute top-0 left-0 w-1.5 h-full ${order.type === 'Pickup' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>

                                        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center relative z-10">
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${order.type === 'Pickup' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                                    <Truck className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-slate-900 text-lg">{order.type} Service</h3>
                                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium border border-yellow-200">
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-slate-600 text-sm flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {order.address}
                                                        </p>
                                                        <p className="text-slate-600 text-sm flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5 text-slate-400" /> Due: <span className="font-semibold text-slate-900">{order.time}</span>
                                                        </p>
                                                        <p className="text-slate-500 text-xs flex items-center gap-1.5 pt-1">
                                                            Cust: {order.customer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
                                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 active:scale-95 transition-all">
                                                    <Navigation className="w-4 h-4" />
                                                    Go
                                                </button>
                                                <a href={`tel:${order.phone.replace(/ /g, '')}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
                                                    <Phone className="w-4 h-4" />
                                                    Call
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Financial Summary Card */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-bold text-slate-900 text-lg">Payroll Breakdown</h2>
                                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500 text-sm font-medium">Completed Deliveries</span>
                                    <span className="font-bold text-slate-900">{stats.deliveries}</span>
                                </div>

                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-500 text-sm font-medium">Commission Earned</span>
                                    <span className="font-bold text-emerald-600">LKR {stats.earnings.toLocaleString()}</span>
                                </div>

                                <div className="border-t border-slate-100 pt-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-slate-600 text-sm">Commission Rate</span>
                                        <span className="text-emerald-600 font-bold">5% / order</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                    <p className="text-right text-xs text-slate-400 mt-1">Goal: 200 Deliveries</p>
                                </div>

                                {/* We only show real commission-based earnings here; base salary can be added when available in backend */}
                            </div>

                            <button className="w-full mt-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm">
                                View Full History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;
