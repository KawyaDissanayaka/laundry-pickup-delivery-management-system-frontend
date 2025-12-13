import React from 'react';
import { ShoppingBag, DollarSign, Truck, Users } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import { mockOrders } from '../data/mockOrders';
import { mockDrivers } from '../data/mockDrivers';

export default function Dashboard() {
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const activeOrders = mockOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
    const activedrivers = mockDrivers.filter(d => d.status === 'Available' || d.status === 'Busy').length;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    trend={12}
                    color="green"
                />
                <MetricCard
                    title="Active Orders"
                    value={activeOrders}
                    icon={ShoppingBag}
                    trend={5}
                    color="blue"
                    subValue="Orders in progress"
                />
                <MetricCard
                    title="Active Riders"
                    value={activedrivers}
                    icon={Truck}
                    color="purple"
                    subValue={`${mockDrivers.length} total riders`}
                />
                <MetricCard
                    title="New Customers"
                    value="12"
                    icon={Users}
                    trend={-2}
                    color="orange"
                />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-sm text-gray-500">
                                <th className="pb-3 px-4">Order ID</th>
                                <th className="pb-3 px-4">Customer</th>
                                <th className="pb-3 px-4">Status</th>
                                <th className="pb-3 px-4">Amount</th>
                                <th className="pb-3 px-4">Delivery Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockOrders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                                    <td className="py-3 px-4 text-gray-600">{order.customerName}</td>
                                    <td className="py-3 px-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">${order.totalAmount.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-gray-500 text-sm">
                                        {new Date(order.deliveryDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
