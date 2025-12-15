import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <PublicNavbar />

            <div className="container mx-auto px-6 py-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-xl text-gray-500">Have questions about our service? We're here to help.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="md:col-span-1 space-y-8">
                        <div className="bg-gray-50 p-8 rounded-2xl">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><Phone size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Phone</h3>
                                    <p className="text-gray-600 mt-1">+94 79 001 1223</p>
                                    <p className="text-sm text-gray-400 mt-1">Mon-Fri 8am-8pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><Mail size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                                    <p className="text-gray-600 mt-1">support@laundrygo.com</p>
                                    <p className="text-sm text-gray-400 mt-1">Response within 2 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><MapPin size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Office</h3>
                                    <p className="text-gray-600 mt-1">No 28, Homagama,<br />Colombo</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-2">
                        <form className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition" />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition">
                                    <option>General Inquiry</option>
                                    <option>Order Support</option>
                                    <option>Commercial Service</option>
                                    <option>Feedback</option>
                                </select>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition resize-none"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                <Send size={20} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
