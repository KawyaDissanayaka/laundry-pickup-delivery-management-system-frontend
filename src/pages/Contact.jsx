import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMessage = {
            id: `MSG-${Date.now().toString().slice(-6)}`,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            date: new Date().toISOString(),
            status: 'New'
        };

        const existingMessages = JSON.parse(localStorage.getItem('laundry_messages') || '[]');
        localStorage.setItem('laundry_messages', JSON.stringify([newMessage, ...existingMessages]));

        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });

        setTimeout(() => setSubmitted(false), 3000);
    };

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
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden">
                            {submitted && (
                                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6 animate-in fade-in">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                        <Send size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                                    <p className="text-gray-500 mt-2">Thank you for contacting us. We will get back to you shortly.</p>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition"
                                >
                                    <option>General Inquiry</option>
                                    <option>Order Support</option>
                                    <option>Commercial Service</option>
                                    <option>Feedback</option>
                                </select>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition resize-none"
                                ></textarea>
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
