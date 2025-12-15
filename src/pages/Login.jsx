import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine context from navigation state
    const role = location.state?.role || 'customer';

    const getTitle = () => {
        switch (role) {
            case 'rider': return 'Rider Portal';
            case 'employee': return 'Staff Portal';
            default: return 'Welcome Back';
        }
    };

    const getSubtitle = () => {
        switch (role) {
            case 'rider': return 'Login to access delivery tasks';
            case 'employee': return 'Login to access work queue';
            default: return 'Sign in to manage your laundry orders';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            const user = login(email, password);
            if (user) {
                switch (user.role) {
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'employee':
                        navigate('/employee-dashboard');
                        break;
                    case 'rider':
                        navigate('/rider-dashboard');
                        break;
                    default:
                        navigate('/customer-dashboard');
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{getTitle()}</h1>
                    <p className="text-gray-600 mt-2">{getSubtitle()}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                        Register now
                    </Link>
                </div>
            </div>
        </div>
    );
}
