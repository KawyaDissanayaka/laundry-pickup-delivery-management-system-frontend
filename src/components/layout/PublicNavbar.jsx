import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function PublicNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            LaundryExpress
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                            Home
                        </Link>
                        <Link to="/about" className={`font-medium transition-colors ${isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                            About Us
                        </Link>
                        <Link to="/services" className={`font-medium transition-colors ${isActive('/services') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                            Services
                        </Link>
                        <Link to="/pricing" className={`font-medium transition-colors ${isActive('/pricing') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                            Pricing
                        </Link>
                        <Link to="/contact" className={`font-medium transition-colors ${isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                            Contact
                        </Link>
                        <Link to="/faq" className={`font-medium transition-colors ${isActive('/faq') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                            FAQ
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="relative group">
                            <button className="px-5 py-2.5 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-all">
                                Login
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right z-50">
                                <div className="py-2">
                                    <Link
                                        to="/login"
                                        state={{ role: 'customer' }}
                                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium border-b border-gray-50"
                                    >
                                        Customer Login
                                    </Link>
                                    <Link
                                        to="/login"
                                        state={{ role: 'rider' }}
                                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium border-b border-gray-50"
                                    >
                                        Rider Login
                                    </Link>
                                    <Link
                                        to="/login"
                                        state={{ role: 'employee' }}
                                        className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium border-b border-gray-50"
                                    >
                                        Employee Login
                                    </Link>
                                    <Link to="/admin/login" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
                                        Admin Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <Link to="/login" className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                            Register
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-5 duration-200">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link to="/" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">Home</Link>
                        <Link to="/about" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">About Us</Link>
                        <Link to="/services" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">Services</Link>
                        <Link to="/pricing" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">Pricing</Link>
                        <Link to="/contact" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">Contact</Link>
                        <Link to="/faq" className="text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">FAQ</Link>
                        <hr />
                        <Link to="/login" className="text-center w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-lg">Login</Link>
                        <Link to="/login" className="text-center w-full py-3 bg-blue-600 text-white font-bold rounded-lg">Register</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
