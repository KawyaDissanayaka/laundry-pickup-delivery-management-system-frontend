import React, { useState, useRef } from 'react';
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
    X,
    FileText,
    Printer,
    Download,
    ChevronRight,
    Package,
    Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- Utility Components ---

const StatusBadge = ({ status }) => {
    const styles = {
        'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
        'Scheduled': 'bg-purple-100 text-purple-700 border-purple-200',
        'Delivered': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'Cancelled': 'bg-red-100 text-red-700 border-red-200',
        'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
            {status}
        </span>
    );
};

const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800 group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {value}
                </h3>
                {trend && <p className="text-xs text-emerald-600 mt-1 font-medium">{trend}</p>}
            </div>
            <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
            </div>
        </div>
    </div>
);

// --- Sub-Components ---

const OverviewTab = ({ stats, recentOrders, setActiveTab }) => (
    <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={ShoppingBag}
                colorClass="bg-blue-500"
                trend="+2 this month"
            />
            <StatCard
                title="Active Orders"
                value={stats.activeOrders}
                icon={Clock}
                colorClass="bg-amber-500"
            />
            <StatCard
                title="Completed"
                value={stats.completedOrders}
                icon={CheckCircle}
                colorClass="bg-emerald-500"
            />
            <StatCard
                title="Total Spent"
                value={`LKR ${stats.totalSpent.toLocaleString()}`}
                icon={DollarSign}
                colorClass="bg-violet-500"
            />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
                    <p className="text-slate-500 text-sm">Your latest laundry updates</p>
                </div>
                <button
                    onClick={() => setActiveTab('orders')}
                    className="text-blue-600 text-sm font-semibold hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Pickup</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-sm font-medium text-slate-900">{order.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-blue-50 rounded text-blue-600">
                                            <Package className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{order.service}</p>
                                            <p className="text-xs text-slate-500">{order.items} items</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        {order.pickup}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">LKR {order.total.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const OrdersTab = ({ recentOrders }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">Order History</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                            <td className="px-6 py-4">
                                <span className="font-mono text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{order.id}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.service}</td>
                            <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">LKR {order.total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ProfileTab = ({ user }) => (
    <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative">
            {/* Cover Banner Mock */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-violet-600"></div>

            <div className="px-8 pb-8">
                <div className="relative flex justify-between items-end -mt-12 mb-8">
                    <div className="flex items-end gap-6">
                        <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-md">
                            <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-3xl font-bold text-slate-400">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                        </div>
                        <div className="mb-1">
                            <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
                            <p className="text-slate-500 font-medium">Premium Member</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors bg-white shadow-sm">
                        Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Contact Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Email</p>
                                        <p className="text-sm text-slate-900">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Phone</p>
                                        <p className="text-sm text-slate-900">077 123 4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-full">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Default Address</h3>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-900 font-medium leading-relaxed">
                                        123 Galle Road,<br />
                                        Colombo 03,<br />
                                        Sri Lanka
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Modals ---

const NewOrderModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        service: 'Wash & Fold',
        date: '',
        time: 'Morning (8-12)',
        items: '',
        instructions: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Schedule Pickup</h3>
                        <p className="text-slate-500 text-sm mt-0.5">Let us handle your laundry</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Service Type</label>
                            <select
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                className="w-full rounded-xl border-slate-200 border bg-slate-50 hover:bg-white focus:bg-white p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            >
                                <option>Wash & Fold</option>
                                <option>Dry Cleaning</option>
                                <option>Ironing Only</option>
                                <option>Household Items</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full rounded-xl border-slate-200 border bg-slate-50 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                />
                                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Time Slot</label>
                            <div className="relative">
                                <select
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full rounded-xl border-slate-200 border bg-slate-50 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none"
                                >
                                    <option>Morning (8-12)</option>
                                    <option>Afternoon (12-4)</option>
                                    <option>Evening (4-8)</option>
                                </select>
                                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Estimated Items</label>
                            <input
                                type="number"
                                placeholder="e.g., 10"
                                required
                                min="1"
                                value={formData.items}
                                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                                className="w-full rounded-xl border-slate-200 border bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Special Instructions <span className="text-slate-400 font-normal">(Optional)</span></label>
                            <textarea
                                rows="3"
                                placeholder="Gate code, stain alerts, specific detergent..."
                                value={formData.instructions}
                                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                                className="w-full rounded-xl border-slate-200 border bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]"
                        >
                            Get Quote & Schedule
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const QuotationModal = ({ isOpen, onClose, data }) => {
    const quotationRef = useRef();

    if (!isOpen || !data) return null;

    // ... (Keep existing print/download logic)
    const handlePrint = () => {
        const printContent = quotationRef.current.innerHTML;

        // Simple print hack for SPA
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
                    <html>
                        <head>
                            <title>Print Quotation</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body class="p-8">
                            ${printContent}
                            <script>
                                setTimeout(() => {
                                    window.print();
                                    window.close();
                                }, 500);
                            </script>
                        </body>
                    </html>
                `);
        printWindow.document.close();
    };

    const handleDownloadPDF = async () => {
        if (quotationRef.current) {
            const canvas = await html2canvas(quotationRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Quotation-${data.id}.pdf`);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Quotation Generated
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                    <div ref={quotationRef} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-sm">

                        {/* Quotation Content Design */}
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <div className="text-2xl font-black text-blue-600 tracking-tight">LaundryHub</div>
                                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mt-1">Order Quotation</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-base font-bold text-slate-900">#{data.id}</h2>
                                <p className="text-slate-500">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="flex justify-between mb-8 p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div>
                                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Customer</span>
                                <span className="block font-semibold text-slate-900">{data.userName || 'Guest User'}</span>
                                <span className="block text-slate-500">{data.userEmail}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Service Type</span>
                                <span className="block font-semibold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md inline-block">{data.service}</span>
                            </div>
                        </div>

                        <table className="w-full mb-8">
                            <thead>
                                <tr className="border-b-2 border-slate-100">
                                    <th className="text-left py-3 text-xs font-bold text-slate-400 uppercase">Description</th>
                                    <th className="text-center py-3 text-xs font-bold text-slate-400 uppercase">Qty</th>
                                    <th className="text-right py-3 text-xs font-bold text-slate-400 uppercase">Unit Price</th>
                                    <th className="text-right py-3 text-xs font-bold text-slate-400 uppercase">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="text-slate-700">
                                    <td className="py-4 font-medium">Laundry Service</td>
                                    <td className="text-center py-4 text-slate-500">{data.items}</td>
                                    <td className="text-right py-4">LKR {data.unitPrice.toFixed(2)}</td>
                                    <td className="text-right py-4 font-medium text-slate-900">LKR {data.total.toFixed(2)}</td>
                                </tr>
                            </tbody>
                            <tfoot className="border-t border-slate-100">
                                <tr>
                                    <td colSpan="3" className="pt-6 text-right font-bold text-slate-900">Total Amount</td>
                                    <td className="pt-6 text-right font-black text-2xl text-blue-600">LKR {data.total.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <p className="text-center text-xs text-slate-400 mt-8">
                            Valid for 24 hours. Prices are subject to final weighing/counting upon pickup.
                        </p>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex gap-3 bg-white">
                    <button
                        onClick={handlePrint}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold transition-colors"
                    >
                        <Printer className="w-4 h-4" />
                        Print
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200 transition-all"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Layout ---

const LaundryDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isQuotationOpen, setIsQuotationOpen] = useState(false);
    const [quotationData, setQuotationData] = useState(null);

    // Mock Data (Refined with LKR)
    const stats = {
        totalOrders: 12,
        activeOrders: 2,
        completedOrders: 10,
        totalSpent: 135000.00
    };

    const recentOrders = [
        { id: 'ORD-001', service: 'Wash & Fold', items: 15, total: 7500.00, status: 'In Progress', date: '2024-03-10', pickup: '2024-03-10 10:00 AM' },
        { id: 'ORD-002', service: 'Dry Clean', items: 3, total: 13500.00, status: 'Scheduled', date: '2024-03-12', pickup: '2024-03-12 02:00 PM' },
        { id: 'ORD-003', service: 'Wash & Iron', items: 8, total: 9750.00, status: 'Delivered', date: '2024-03-05', pickup: '2024-03-05 09:00 AM' },
    ];

    const handleOrderSubmit = (formData) => {
        // Price Calculation Logic
        const basePrice = {
            'Wash & Fold': 450.0,
            'Dry Cleaning': 1500.0,
            'Ironing Only': 600.0,
            'Household Items': 2400.0
        }[formData.service] || 450.0;

        const itemCount = Number(formData.items);
        const total = basePrice * itemCount;

        const newQuotation = {
            id: `QT-${Math.floor(Math.random() * 10000)}`,
            service: formData.service,
            items: itemCount,
            unitPrice: basePrice,
            total: total,
            userName: user?.name,
            userEmail: user?.email,
            date: new Date().toISOString()
        };

        setQuotationData(newQuotation);
        setIsOrderModalOpen(false);
        setIsQuotationOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
            {/* Top Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent hidden sm:block">
                                LaundryHub
                            </span>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="hidden sm:flex flex-col items-end mr-2">
                                <span className="text-sm font-bold text-slate-800">{user?.name || 'Guest'}</span>
                                <span className="text-xs text-slate-500 font-medium">{user?.email}</span>
                            </div>
                            <button
                                onClick={() => { logout(); navigate('/'); }}
                                className="p-2.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Action Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                        <p className="text-slate-500 mt-2 font-medium">Welcome back! manage your orders and profile.</p>
                    </div>
                    <button
                        onClick={() => setIsOrderModalOpen(true)}
                        className="group flex items-center justify-center gap-2.5 bg-slate-900 text-white px-7 py-3.5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:translate-y-[-2px] active:translate-y-[1px]"
                    >
                        <div className="bg-white/20 p-1 rounded-lg group-hover:bg-white/30 transition-colors">
                            <Plus className="w-5 h-5" />
                        </div>
                        <span className="font-bold">New Order</span>
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex space-x-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit mb-10 mx-auto md:mx-0 overflow-x-auto max-w-full">
                    {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'orders', label: 'My Orders', icon: ShoppingBag },
                        { id: 'profile', label: 'Profile', icon: User },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap
                                ${activeTab === tab.id
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                }
                            `}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'opacity-100' : 'opacity-70'}`} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                    {activeTab === 'overview' && (
                        <OverviewTab stats={stats} recentOrders={recentOrders} setActiveTab={setActiveTab} />
                    )}
                    {activeTab === 'orders' && (
                        <OrdersTab recentOrders={recentOrders} />
                    )}
                    {activeTab === 'profile' && (
                        <ProfileTab user={user} />
                    )}
                </div>
            </div>

            {/* Modals */}
            <NewOrderModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                onSubmit={handleOrderSubmit}
            />
            <QuotationModal
                isOpen={isQuotationOpen}
                onClose={() => setIsQuotationOpen(false)}
                data={quotationData}
            />
        </div>
    );
};

export default LaundryDashboard;
