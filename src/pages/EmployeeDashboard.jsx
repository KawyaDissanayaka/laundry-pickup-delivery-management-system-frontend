import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutList, Package, CheckSquare, Clock, LogOut, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Mock Active Tasks
    const activeTasks = [
        { id: 'ORD-001', service: 'Wash & Fold', items: 15, status: 'Sorting', priority: 'High' },
        { id: 'ORD-003', service: 'Dry Clean', items: 4, status: 'Washing', priority: 'Normal' },
        { id: 'ORD-009', service: 'Ironing', items: 10, status: 'Ready', priority: 'Normal' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                        <LayoutList className="h-6 w-6" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Staff Portal</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Logged in as: <span className="font-semibold">{user?.name}</span></span>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm mb-1">Pending Orders</div>
                        <div className="text-2xl font-bold text-gray-900">12</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm mb-1">Processed Today</div>
                        <div className="text-2xl font-bold text-blue-600">25</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm mb-1">Hours Worked</div>
                        <div className="text-2xl font-bold text-purple-600">42h</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-gray-500 text-sm mb-1">Current Salary</div>
                        <div className="text-2xl font-bold text-green-600">LKR 3.2k</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Tasks */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-900">Work Queue</h2>
                                <button className="text-sm text-blue-600 font-medium">View All</button>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {activeTasks.map((task) => (
                                    <div key={task.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-gray-100 p-2 rounded-lg text-gray-500">
                                                <Package className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{task.service}</h3>
                                                <p className="text-sm text-gray-500">Order #{task.id} • {task.items} Items</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {task.priority} Priority
                                            </span>
                                            <select
                                                className="border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                                                defaultValue={task.status}
                                            >
                                                <option>Pending</option>
                                                <option>Sorting</option>
                                                <option>Washing</option>
                                                <option>Drying</option>
                                                <option>Folding</option>
                                                <option>Ready</option>
                                            </select>
                                            <button className="p-2 text-gray-400 hover:text-green-600">
                                                <CheckSquare className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions / Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Salary Details</h3>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm text-gray-500">Base Salary</div>
                                <div className="font-semibold text-gray-900">LKR 3,200.00</div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-sm text-gray-500">Overtime Rate</div>
                                <div className="font-semibold text-gray-900">LKR 25.00/hr</div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 mt-4">
                                <div className="flex gap-2">
                                    <Clock className="h-5 w-5 text-yellow-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-yellow-800">Next Pay Date</p>
                                        <p className="text-xs text-yellow-700">Dec 25, 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
