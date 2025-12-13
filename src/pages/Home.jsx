import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, ShieldCheck } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <header className="bg-blue-600 text-white">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold">LaundryExpress</div>
                    <div className="space-x-4">
                        <Link to="/login" className="px-4 py-2 hover:bg-blue-700 rounded transition">Login</Link>
                        <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded font-semibold hover:bg-gray-100 transition">Register</Link>
                    </div>
                </nav>

                <div className="container mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Laundry Service <br /> Delivered to Your Door</h1>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">We take care of your laundry so you can take care of what matters most. Fast, reliable, and fresh.</p>
                    <Link to="/login" className="px-8 py-3 bg-white text-blue-600 text-lg font-bold rounded-full hover:bg-gray-100 transition shadow-lg inline-block">
                        Schedule a Pickup
                    </Link>
                </div>
            </header>

            {/* Features */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Truck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Free Pickup & Delivery</h3>
                            <p className="text-gray-600">We pick up your dirty clothes and return them fresh and clean at your convenience.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">24h Turnaround</h3>
                            <p className="text-gray-600">Get your laundry back in as little as 24 hours. Express service available.</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Quality Guarantee</h3>
                            <p className="text-gray-600">We treat your clothes with the utmost care. Satisfaction guaranteed.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-10">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2024 LaundryExpress. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
