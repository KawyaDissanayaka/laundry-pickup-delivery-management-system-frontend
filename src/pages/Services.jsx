import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import { Shirt, Sparkles, Briefcase, RefreshCw, ArrowRight } from 'lucide-react';

export default function Services() {
    const services = [
        {
            title: "Wash & Fold",
            description: "Perfect for your everyday laundry. We wash, dry, and neatly fold your clothes.",
            icon: Shirt,
            color: "blue"
        },
        {
            title: "Dry Cleaning",
            description: "Professional care for your delicate fabrics, suits, dresses, and more.",
            icon: Sparkles,
            color: "purple"
        },
        {
            title: "Commercial Laundry",
            description: "Reliable laundry solutions for hotels, gyms, spas, and restaurants.",
            icon: Briefcase,
            color: "indigo"
        },
        {
            title: "Ironing Service",
            description: "Get crisp, wrinkle-free clothes ready to wear straight from the bag.",
            icon: RefreshCw,
            color: "green"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-white py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Services</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">Comprehensive care for all your fabric needs.</p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className={`w-14 h-14 bg-${service.color}-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                            <a href="/pricing" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                                View Pricing <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* How it Works */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-16">How It Works</h2>
                    <div className="flex flex-col md:flex-row justify-between items-center relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0 -translate-y-1/2"></div>

                        {[
                            { step: 1, title: "Schedule Pickup", desc: "Book online or via app" },
                            { step: 2, title: "We Collect", desc: "Driver arrives at your door" },
                            { step: 3, title: "We Clean", desc: "Expert care for your clothes" },
                            { step: 4, title: "Fast Delivery", desc: "Fresh clothes back to you" }
                        ].map((item, idx) => (
                            <div key={idx} className="relative z-10 bg-white p-6 max-w-xs">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
