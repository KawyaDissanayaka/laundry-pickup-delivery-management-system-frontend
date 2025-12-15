import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutList, Package, CheckSquare, Clock, LogOut, DollarSign, AlertCircle, BarChart3, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Mock Active Tasks (with enhanced data)
    const activeTasks = [
        { id: 'ORD-001', service: 'Wash & Fold', items: 15, status: 'Sorting', priority: 'High', dueIn: '2 hrs' },
        { id: 'ORD-003', service: 'Dry Clean', items: 4, status: 'Washing', priority: 'Normal', dueIn: '4 hrs' },
        { id: 'ORD-009', service: 'Ironing', items: 10, status: 'Ready', priority: 'Normal', dueIn: '5 hrs' },
    ];

    const stats = {
        pending: 12,
        processed: 25,
        hours: 42,
        salary: 96000
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Header */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 h-20 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-violet-600 p-2.5 rounded-xl shadow-lg shadow-violet-200 text-white">
                        <LayoutList className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Staff Portal</h1>
                        <p className="text-xs text-slate-500 font-medium">Operations Dashboard</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-bold text-slate-800">{user?.name || 'Staff Member'}</p>
                        <p className="text-xs text-emerald-600 font-medium flex items-center justify-end gap-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> On Shift
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="End Shift / Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Package className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+4 new</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">{stats.pending}</h3>
                        <p className="text-slate-500 text-sm font-medium">Pending Orders</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-emerald-200 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                                <CheckSquare className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">{stats.processed}</h3>
                        <p className="text-slate-500 text-sm font-medium">Processed Today</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-violet-200 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-violet-50 text-violet-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">{stats.hours}h</h3>
                        <p className="text-slate-500 text-sm font-medium">Weekly Hours</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-2xl shadow-lg shadow-slate-200 text-white relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <DollarSign className="w-5 h-5 text-emerald-400" />
                            </div>
                            <span className="text-xs font-bold text-emerald-300 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">Current</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1 relative z-10">LKR {stats.salary / 1000}k</h3>
                        <p className="text-slate-400 text-sm font-medium relative z-10">Accrued Salary</p>

                        {/* Decor */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Task Queue */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-violet-600" />
                                Work Queue
                            </h2>
                            <div className="flex gap-2">
                                <span className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 shadow-sm">All Tasks</span>
                                <span className="text-slate-400 px-3 py-1.5 text-xs font-semibold hover:text-slate-600 cursor-pointer">High Priority</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {activeTasks.map((task) => (
                                <div key={task.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-slate-900 text-lg">{task.service}</h3>
                                                    {task.priority === 'High' && (
                                                        <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold border border-red-100 flex items-center gap-1">
                                                            <AlertCircle className="w-3 h-3" /> High
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-slate-500 text-sm font-medium">
                                                    Order <span className="font-mono text-slate-700">#{task.id}</span> • {task.items} Items
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100 sm:w-auto w-full">
                                            <select
                                                className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none px-2 py-1.5 w-full sm:w-32"
                                                defaultValue={task.status}
                                            >
                                                <option>Pending</option>
                                                <option>Sorting</option>
                                                <option>Washing</option>
                                                <option>Drying</option>
                                                <option>Folding</option>
                                                <option>Ready</option>
                                            </select>
                                            <button className="bg-white text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-2 rounded-lg shadow-sm border border-slate-100 transition-colors">
                                                <CheckSquare className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="bg-slate-50 -mx-5 -mb-5 mt-5 px-5 py-3 border-t border-slate-100 flex justify-between items-center text-xs">
                                        <span className="text-slate-400 font-medium">Assigned: Today, 9:00 AM</span>
                                        <span className="text-slate-600 font-semibold flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> Due in {task.dueIn}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
                            <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-slate-400" />
                                Salary Details
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Base Salary</p>
                                    <p className="text-xl font-bold text-slate-900">LKR 96,000<span className="text-sm text-slate-400 font-medium">.00</span></p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div>
                                        <p className="text-slate-500 text-xs font-bold uppercase mb-1">Overtime Rate</p>
                                        <p className="text-slate-900 font-bold">LKR 750 <span className="text-xs text-slate-400 font-normal">/hr</span></p>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <BarChart3 className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <div className="flex gap-3 items-start p-3 bg-amber-50 border border-amber-100 rounded-xl">
                                    <Calendar className="w-5 h-5 text-amber-600 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-amber-800">Next Pay Date</p>
                                        <p className="text-xs text-amber-700 mt-1">Dec 25, 2024</p>
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
