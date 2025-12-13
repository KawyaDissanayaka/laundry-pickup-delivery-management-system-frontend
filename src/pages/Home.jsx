import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, ShieldCheck } from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <PublicNavbar />

            {/* Hero Section */}
            <header className="bg-blue-600 text-white pt-20 pb-24 md:pt-32 md:pb-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545173168-9f1947eebb8f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                        Premium Laundry Service <br className="hidden md:block" />
                        <span className="text-blue-100">Delivered to Your Door</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto font-light">
                        We take care of your laundry so you can take care of what matters most. Fast, reliable, and fresh.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/login" className="px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-full hover:bg-blue-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block">
                            Schedule a Pickup
                        </Link>
                        <Link to="/services" className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white/10 transition inline-block">
                            View Services
                        </Link>
                    </div>
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
