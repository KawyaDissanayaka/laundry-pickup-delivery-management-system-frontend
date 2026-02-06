import React, { useState, useEffect } from 'react';
import { ShoppingBag, DollarSign, Truck, Users, TrendingUp, TrendingDown, Calendar, ArrowRight, Activity } from 'lucide-react';
import { orderService } from '../services/orderService';
import api from '../services/api';

// Custom Card Component
const DashboardCard = ({ title, value, icon: Icon, color, trend, subValue }) => {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600 shadow-blue-200',
        purple: 'from-purple-500 to-purple-600 shadow-purple-200',
        green: 'from-emerald-500 to-emerald-600 shadow-emerald-200',
        orange: 'from-orange-500 to-orange-600 shadow-orange-200',
    };

    return (
        <div className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg transition-transform hover:-translate-y-1`}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-black opacity-5 blur-xl"></div>

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-blue-100 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold mb-1">{value}</h3>
                    <p className="text-blue-50 text-xs opacity-90">{subValue}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center text-sm font-medium">
                    {trend > 0 ? (
                        <span className="flex items-center text-emerald-100 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" /> +{trend}%
                        </span>
                    ) : (
                        <span className="flex items-center text-red-100 bg-red-500/20 px-2 py-0.5 rounded-full">
                            <TrendingDown className="w-3 h-3 mr-1" /> {trend}%
                        </span>
                    )}
                    <span className="ml-2 text-white/60 text-xs">vs last month</span>
                </div>
            )}
        </div>
    );
};

export default function Dashboard() {
    const [timeRange, setTimeRange] = useState('Month');
    const [dashboardData, setDashboardData] = useState({
        revenue: 0,
        activeOrders: 0,
        activeDrivers: 0,
        newCustomers: 0,
        chartData: [],
        chartLabels: [],
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // Load analytics from backend
                const analyticsResponse = await api.get('/admin/analytics/stats');
                const analytics = analyticsResponse.data;

                // Load all orders (already normalized by orderService)
                const orders = await orderService.getAllOrders();

                // Prefer backend-provided counts for consistency with DB
                const activeOrdersCount = analytics.activeOrders ?? 0;
                const activeRidersCount = analytics.activeRiders ?? 0;

                // Fallback: unique riders from current orders if backend field missing
                const uniqueRiders = new Set(
                    orders
                        .filter(o => o.driverId)
                        .map(o => o.driverId)
                );

                // Build monthly revenue series from completed orders for the current year
                const monthlyRevenue = Array(12).fill(0);
                const currentYear = new Date().getFullYear();
                orders.forEach(o => {
                    if (!o.totalAmount) return;
                    const dateSource = o.completedAt || o.createdAt;
                    if (!dateSource) return;
                    const d = new Date(dateSource);
                    if (Number.isNaN(d.getTime()) || d.getFullYear() !== currentYear) return;
                    monthlyRevenue[d.getMonth()] += o.totalAmount;
                });

                const maxMonthly = Math.max(...monthlyRevenue, 1);
                const chartData = monthlyRevenue.map(v => Math.round((v / maxMonthly) * 100));
                const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                // Get recent orders (last 5 by created date)
                const recentOrders = orders
                    .slice()
                    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                    .slice(0, 5);

                setDashboardData({
                    revenue: analytics.totalRevenue || 0,
                    companyRevenue: analytics.companyRevenue || 0,
                    activeOrders: activeOrdersCount,
                    activeDrivers: activeRidersCount || uniqueRiders.size,
                    newCustomers: analytics.newCustomers || 0,
                    chartData,
                    chartLabels,
                    recentOrders
                });
            } catch (error) {
                console.error('Error loading dashboard data:', error);
                // Set default values on error
                setDashboardData({
                    revenue: 0,
                    companyRevenue: 0,
                    activeOrders: 0,
                    activeDrivers: 0,
                    newCustomers: 0,
                    chartData: [],
                    chartLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    recentOrders: []
                });
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
        // Refresh every 30 seconds
        const interval = setInterval(loadDashboardData, 30000);
        return () => clearInterval(interval);
    }, []);

    const data = dashboardData;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
                    {['Day', 'Week', 'Month'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${timeRange === range
                                ? 'text-blue-600 bg-blue-50 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {range === 'Day' ? 'Daily' : range === 'Week' ? 'Weekly' : 'Monthly'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                    title={`Total Revenue (${timeRange})`}
                    value={`LKR ${data.revenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="green"
                    subValue="Completed orders revenue"
                />
                <DashboardCard
                    title="Active Orders"
                    value={data.activeOrders}
                    icon={ShoppingBag}
                    color="blue"
                    subValue="Not yet completed"
                />
                <DashboardCard
                    title="Active Riders"
                    value={data.activeDrivers}
                    icon={Truck}
                    color="purple"
                    subValue="Handling active orders"
                />
                <DashboardCard
                    title="Customers"
                    value={data.newCustomers}
                    icon={Users}
                    color="orange"
                    subValue="Registered in system"
                />
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Chart Placeholder - Simplified for UI */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Revenue Analytics ({timeRange})</h2>
                        <button className="text-sm text-blue-600 hover:underline">View Report</button>
                    </div>
                    {/* CSS Bar Chart Simulation */}
                    <div className="h-64 flex items-end justify-between gap-2">
                        {data.chartData.map((h, i) => (
                            <div key={i} className="w-full bg-blue-50 hover:bg-blue-100 rounded-t-lg relative group transition-all duration-300">
                                <div
                                    style={{ height: `${h}%` }}
                                    className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"
                                >
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {h}% Capacity
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-400 uppercase font-bold tracking-wider">
                        {data.chartLabels.map((label, i) => (
                            <span key={i} className="flex-1 text-center">{label}</span>
                        ))}
                    </div>
                </div>

                {/* Recent Activity / Mini List */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">System Status</h2>
                    <div className="space-y-6">
                        <div className="flex items-center p-3 bg-red-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
                                <Activity className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Order Load</h4>
                                <p className="text-xs text-gray-500">
                                    {data.activeOrders} active orders in progress
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-green-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                                <Truck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Fleet Activity</h4>
                                <p className="text-xs text-gray-500">{data.activeDrivers} riders handling orders</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-purple-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Customer Base</h4>
                                <p className="text-xs text-gray-500">{data.newCustomers} customers in the system</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors">
                        System Diagnostics
                    </button>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                    <button className="flex items-center text-sm font-bold text-blue-600 hover:text-blue-800">
                        View All Orders <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <th className="py-4 px-6">Order ID</th>
                                <th className="py-4 px-6">Customer</th>
                                <th className="py-4 px-6">Service Type</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-8 px-6 text-center text-gray-500">
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : data.recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 px-6 text-center text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                data.recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="py-4 px-6 font-bold text-gray-900">
                                            <span className="font-mono text-blue-600">#{order.id}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 mr-3">
                                                    {(order.customerName || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-700">{order.customerName || 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-500 text-sm">
                                            {order.items?.[0]?.service || order.serviceType || 'Standard Wash'}
                                        </td>
                                        <td className="py-4 px-6">
                                            {(() => {
                                                const code = order.status;
                                                const label = order.statusLabel || order.status;
                                                let classes = 'bg-gray-100 text-gray-700';
                                                if (code === 'DELIVERED' || code === 'COMPLETED') {
                                                    classes = 'bg-green-100 text-green-700';
                                                } else if (code === 'PROCESSING' || code === 'AT_LAUNDRY' || code === 'READY') {
                                                    classes = 'bg-blue-100 text-blue-700';
                                                } else if (code === 'PLACED' || code === 'ASSIGNED') {
                                                    classes = 'bg-yellow-100 text-yellow-700';
                                                }
                                                return (
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${classes}`}>
                                                        {label}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                        <td className="py-4 px-6 text-right font-bold text-gray-900">
                                            LKR {order.totalAmount?.toFixed(2) || '0.00'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
