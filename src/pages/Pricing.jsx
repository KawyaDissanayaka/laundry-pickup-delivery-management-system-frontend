import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
    const plans = [
        {
            name: "Pay As You Go",
            price: "$1.50",
            unit: "/ lb",
            features: [
                "No subscription needed",
                "Next-day delivery",
                "Standard detergents",
                "Stain treatment included"
            ],
            button: "Start Order",
            popular: false
        },
        {
            name: "Monthly Pro",
            price: "$59",
            unit: "/ month",
            features: [
                "40 lbs included",
                "Free pickup & delivery",
                "Premium detergents",
                "Same-day rush available",
                "Rollover unused lbs"
            ],
            button: "Subscribe Now",
            popular: true
        },
        {
            name: "Family Plan",
            price: "$99",
            unit: "/ month",
            features: [
                "80 lbs included",
                "Priority scheduling",
                "Eco-friendly options",
                "Separate bagging per person",
                "Dedicated support"
            ],
            button: "Subscribe Now",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-blue-600 py-24 text-center text-white">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-xl opacity-90 max-w-xl mx-auto">No hidden fees. Choose a plan that fits your lifestyle.</p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container mx-auto px-6 -mt-16 pb-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div key={index} className={`bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ${plan.popular ? 'ring-4 ring-blue-400 relative' : ''}`}>
                            {plan.popular && (
                                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 absolute top-4 right-4 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-extrabold text-blue-600">{plan.price}</span>
                                    <span className="text-gray-500 ml-2">{plan.unit}</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-gray-600">
                                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/login"
                                    className={`block w-full text-center py-4 rounded-xl font-bold transition-all ${plan.popular
                                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {plan.button}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-16 text-center text-gray-600">
                    <p className="mb-2 font-semibold">Need commercial pricing?</p>
                    <Link to="/contact" className="text-blue-600 hover:underline">Contact our sales team</Link>
                </div>
            </div>
        </div>
    );
}
