import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Truck, MapPin, Clock, DollarSign, LogOut, CheckCircle, Navigation, Phone, Menu, X, Wallet, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import api from '../services/api';

const RiderDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isAvailable, setIsAvailable] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Dummy Data එක සහිතව useState එක මෙතන තියෙන්නේ
    const [assignedOrders, setAssignedOrders] = useState([
        {
            id: 'ORD-5542',
            type: 'Delivery',
            customer: 'Chaminda Perera',
            address: '123, Galle Road, Colombo 03',
            time: '10:45 AM',
            status: 'READY',
            phone: '0771234567'
        }
    ]);

    const [stats, setStats] = useState({
        deliveries: 12,
        today: 1,
        earnings: 4500
    });

    const loadData = async () => {
        if (user?.id) {
            try {
                const orders = await orderService.getOrdersByRider(user.id);
                if (orders && orders.length > 0) {
                    const formatted = orders.map(order => ({
                        id: order.id,
                        type: order.status === 'READY' || order.status === 'DELIVERED' ? 'Delivery' : 'Pickup',
                        address: order.address || 'Address not provided',
                        time: order.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'N/A',
                        status: order.statusLabel || order.status,
                        customer: order.customerName || 'Unknown Customer',
                        phone: order.customerPhone || '077 123 4567' 
                    }));
                    setAssignedOrders(formatted);
                }
                
                const statsResponse = await api.get('/rider/dashboard/stats');
                if (statsResponse.data) {
                    setStats({
                        deliveries: orders.filter(o => o.status === 'COMPLETED').length,
                        today: orders.length,
                        earnings: statsResponse.data.commission || 0
                    });
                }
            } catch (error) {
                console.error('Error loading rider data:', error);
            }
        }
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 15000);
        return () => clearInterval(interval);
    }, [user?.id]);

    const handleConfirmOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to mark this as delivered?')) {
            try {
                // Backend API call (Update this URL as per your backend)
                // await api.put(`/orders/${orderId}/status`, { status: 'DELIVERED' });
                alert('Order confirmed successfully!');
                // Temporary logic to clear dummy data on confirm
                setAssignedOrders(prev => prev.filter(o => o.id !== orderId));
            } catch (error) {
                console.error('Failed to confirm order:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20 md:pb-0">
            {/* Nav Header */}
            <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Truck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Rider Portal</h1>
                            <p className="text-slate-400 text-xs">{user?.name || 'Active Rider'}</p>
                        </div>
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-slate-800 rounded-full md:hidden">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <div className="hidden md:flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isAvailable ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></span>
                            <span className="text-sm font-medium">{isAvailable ? 'Online' : 'Offline'}</span>
                        </div>
                        <button onClick={() => { logout(); navigate('/'); }} className="text-red-400 hover:text-red-300">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-6 md:py-8 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <CheckCircle className="w-5 h-5 text-blue-600 mb-2" />
                        <p className="text-slate-500 text-xs font-medium uppercase">Completed</p>
                        <p className="text-2xl font-bold">{stats.deliveries}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                        <Clock className="w-5 h-5 text-purple-600 mb-2" />
                        <p className="text-slate-500 text-xs font-medium uppercase">Active</p>
                        <p className="text-2xl font-bold">{assignedOrders.length}</p>
                    </div>
                    <div className="col-span-2 bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl text-white relative overflow-hidden">
                        <div className="z-10 relative">
                            <p className="text-emerald-100 text-xs font-medium uppercase">Earnings</p>
                            <p className="text-3xl font-bold">LKR {stats.earnings.toLocaleString()}</p>
                        </div>
                        <Wallet className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white/10" />
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-lg font-bold text-slate-800">My Assignments</h2>

                        {assignedOrders.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-dashed border-slate-200">
                                <p>No orders currently assigned.</p>
                            </div>
                        ) : (
                            assignedOrders.map((order) => (
                                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 relative overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-1.5 h-full ${order.type === 'Pickup' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>

                                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-slate-50 p-3 rounded-xl">
                                                <Truck className={`w-6 h-6 ${order.type === 'Pickup' ? 'text-blue-600' : 'text-orange-600'}`} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.id}</span>
                                                    <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold">{order.status}</span>
                                                </div>
                                                
                                                {/* Customer Name */}
                                                <div className="flex items-center gap-2 mb-2">
                                                    <User className="w-4 h-4 text-blue-600" />
                                                    <h3 className="font-extrabold text-slate-900 text-lg leading-none">{order.customer}</h3>
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-slate-600 text-sm flex items-start gap-2">
                                                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" /> {order.address}
                                                    </p>
                                                    <p className="text-slate-600 text-sm flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-slate-400 shrink-0" /> <span className="font-bold text-slate-900">{order.time}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2 w-full md:w-48">
                                            <div className="flex gap-2">
                                                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-200">
                                                    <Navigation className="w-4 h-4" /> Go
                                                </button>
                                                <a href={`tel:${order.phone}`} className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50">
                                                    <Phone className="w-4 h-4" /> Call
                                                </a>
                                            </div>
                                            <button 
                                                onClick={() => handleConfirmOrder(order.id)}
                                                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-md shadow-emerald-50 active:scale-95 transition-all"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Confirm Delivery
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <h2 className="font-bold text-slate-900 mb-4">Financial Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Today's Earnings</span>
                                    <span className="font-bold text-emerald-600">LKR {stats.earnings}</span>
                                </div>
                                <button className="w-full py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">
                                    View Full History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiderDashboard;