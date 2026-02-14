import React, { useState, useEffect } from 'react';
import { Phone, Mail, DollarSign, ArrowDown, UserMinus } from 'lucide-react';
import api from '../services/api';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [employeesResponse, customersResponse] = await Promise.all([
                    api.get('/admin/users/employees'),
                    api.get('/admin/users/customers')
                ]);
                setEmployees(employeesResponse.data);
                setCustomers(customersResponse.data);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleDemoteToCustomer = async (employeeId) => {
        if (!confirm('Are you sure you want to demote this employee to Customer?')) return;
        
        try {
            await api.put(`/admin/users/${employeeId}/change-role`, {
                newRole: 'CUSTOMER'
            });
            
            // Reload data
            const [employeesResponse, customersResponse] = await Promise.all([
                api.get('/admin/users/employees'),
                api.get('/admin/users/customers')
            ]);
            setEmployees(employeesResponse.data);
            setCustomers(customersResponse.data);
            
            alert('Employee demoted to Customer successfully!');
        } catch (error) {
            alert('Error demoting employee: ' + (error.response?.data?.message || error.message));
        }
    };

    const handlePromoteFromCustomer = async () => {
        if (!selectedCustomerId) return;
        
        try {
            await api.put(`/admin/users/${selectedCustomerId}/change-role`, {
                newRole: 'EMPLOYEE'
            });
            
            // Reload data
            const [employeesResponse, customersResponse] = await Promise.all([
                api.get('/admin/users/employees'),
                api.get('/admin/users/customers')
            ]);
            setEmployees(employeesResponse.data);
            setCustomers(customersResponse.data);
            
            alert('Customer promoted to Employee successfully!');
            setIsModalOpen(false);
            setSelectedCustomerId('');
        } catch (error) {
            alert('Error promoting customer: ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading employees...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <ArrowDown className="h-4 w-4" /> Promote Customer
                </button>
            </div>

            {/* Employee Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase text-xs tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase text-xs tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase text-xs tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase text-xs tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right font-bold text-slate-700 uppercase text-xs tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No employees found
                                    </td>
                                </tr>
                            ) : (
                                employees.map((employee, index) => (
                                    <tr key={employee.id} className="hover:bg-slate-50 transition-colors duration-150">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md ${index % 5 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                                                    index % 5 === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                                                        index % 5 === 2 ? 'bg-gradient-to-br from-pink-500 to-pink-600' :
                                                            index % 5 === 3 ? 'bg-gradient-to-br from-teal-500 to-teal-600' :
                                                                'bg-gradient-to-br from-orange-500 to-orange-600'
                                                    }`}>
                                                    {employee.fullName?.charAt(0) || 'E'}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-base">{employee.fullName}</div>
                                                    <div className="text-xs text-slate-500 font-medium">{employee.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Mail className="h-4 w-4 text-slate-400" />
                                                    <span className="font-medium">{employee.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Phone className="h-4 w-4 text-slate-400" />
                                                    <span className="font-medium">{employee.phone || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm">
                                                {employee.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-700 ring-1 ring-green-200">
                                                <span className="w-1.5 h-1.5 rounded-full mr-2 bg-green-500" />
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleDemoteToCustomer(employee.id)}
                                                    className="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                                    title="Demote to Customer"
                                                >
                                                    <UserMinus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Promotion Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Promote Customer to Employee</h2>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Customer</label>
                            <select 
                                value={selectedCustomerId}
                                onChange={(e) => setSelectedCustomerId(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a customer to promote</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.fullName} ({customer.email})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handlePromoteFromCustomer}
                                disabled={!selectedCustomerId}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                Promote to Employee
                            </button>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedCustomerId('');
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
