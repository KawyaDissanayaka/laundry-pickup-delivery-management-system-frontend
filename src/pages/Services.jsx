import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';
import { Shirt, Sparkles, Briefcase, RefreshCw, X, ArrowRight } from 'lucide-react';

export default function Services() {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            id: 1,
            title: "Wash & Fold",
            shortDesc: "Standard",
            description: "Welcome to our Wash and Fold Service – where laundry day becomes a breeze. At Kleen, we transform the chore of washing and folding into an effortless, efficient, and enjoyable experience. Our dedicated team meticulously handles your clothes, using premium detergents and a keen eye for detail to ensure each item is treated with the care it deserves.",
            details: [
                "Send in your bag of dirty laundry, towels, sheets, etc.",
                "We check all items to make sure they are washable and dryable.",
                "We sort everything by colors, to prevent dye transfer in the wash.",
                "Items are folded immediately; like items are packaged together."
            ],
            icon: Shirt,
        },
        {
            id: 2,
            title: "Dry Cleaning",
            shortDesc: "Standard",
            description: "Professional dry cleaning for your most delicate garments. We use eco-friendly solvents that are tough on stains but gentle on fabrics, ensuring your suits, dresses, and special items return to you looking immaculate and feeling fresh.",
            details: [
                "Expert stain inspection and pre-treatment.",
                "Gentle eco-friendly dry cleaning process.",
                "Hand finishing and pressing.",
                "Preservation packaging for long-term storage."
            ],
            icon: Sparkles,
        },
        {
            id: 3,
            title: "Wash Dry And Iron",
            shortDesc: "Standard",
            description: "The complete package for your wardrobe. We wash, dry, and expertly iron your shirts, pants, and linens so you can step out looking sharp without lifting a finger. Perfect for busy professionals.",
            details: [
                "Premium washing and drying cycle.",
                "Professional steam ironing.",
                "Hanger or folded presentation based on preference.",
                "Starch options available upon request."
            ],
            icon: RefreshCw,
        },
        {
            id: 4,
            title: "Iron Only",
            shortDesc: "Standard",
            description: "Already washed your clothes but dread the ironing board? Let us handle the wrinkles. We provide professional ironing services that give your clean clothes that crisp, polished shop-finish look.",
            details: [
                "Hand ironed by professionals.",
                "Temperature controlled for specific fabrics.",
                "Returned on hangers or neatly folded.",
                "Quick turnaround service available."
            ],
            icon: Briefcase,
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            <PublicNavbar />

            {/* Header Section */}
            <div className="pt-24 pb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Services</h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto px-6">
                    Experience the ultimate convenience with our premium laundry and dry cleaning services.
                </p>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            onClick={() => setSelectedService(service)}
                            className="group relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-100 overflow-hidden"
                        >
                            {/* Card Background Decoration */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-teal-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                            {/* Icon Container */}
                            <div className="w-full aspect-[4/3] bg-teal-400 rounded-xl mb-6 flex items-center justify-center group-hover:bg-teal-500 transition-colors duration-300 relative overflow-hidden">
                                <service.icon strokeWidth={1.5} className="w-24 h-24 text-slate-900 z-10" />
                                {/* Decorative Circles */}
                                <div className="absolute top-4 right-4 w-4 h-4 border-2 border-slate-800 rounded-full opacity-50"></div>
                                <div className="absolute bottom-6 left-6 w-3 h-3 bg-slate-800 rounded-full opacity-30"></div>
                                <div className="absolute top-1/2 left-4 w-2 h-2 border border-slate-800 rounded-full"></div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-1">{service.title}</h3>
                            <p className="text-sm font-medium text-slate-400 mb-4">{service.shortDesc}</p>

                            <div className="flex items-center text-teal-600 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                Learn More <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Section */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">The People Behind The Service</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Meet Our Experts</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            Dedicated professionals committed to delivering the best laundry care experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Team Member 1 */}
                        <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                                    alt="Team Member"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white font-medium text-sm">"Quality is my priority"</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-900">David Chen</h3>
                                <p className="text-teal-600 font-medium text-sm">Operations Manager</p>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                                    alt="Team Member"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white font-medium text-sm">"Care in every fold"</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-900">Sarah Johnson</h3>
                                <p className="text-teal-600 font-medium text-sm">Lead Specialist</p>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
                                    alt="Team Member"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white font-medium text-sm">"Efficiency matters"</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-900">Michael Ross</h3>
                                <p className="text-teal-600 font-medium text-sm">Logistics Head</p>
                            </div>
                        </div>

                        {/* Team Member 4 */}
                        <div className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                                <img
                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
                                    alt="Team Member"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white font-medium text-sm">"Customer happiness first"</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-900">Emily Davis</h3>
                                <p className="text-teal-600 font-medium text-sm">Customer Relations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedService(null)}
                    ></div>

                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200 h-[85vh] md:h-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-6 h-6 text-slate-600" />
                        </button>

                        {/* Left Side: Visual */}
                        <div className="w-full md:w-5/12 bg-teal-400 p-8 md:p-12 flex items-center justify-center relative overflow-hidden h-48 md:h-auto shrink-0">
                            <div className="relative z-10">
                                <selectedService.icon strokeWidth={1.2} className="w-32 h-32 md:w-48 md:h-48 text-slate-900" />
                            </div>
                            {/* Visual Decors only on desktop to save space on mobile */}
                            <div className="hidden md:block absolute top-10 right-10 w-8 h-8 rounded-full border-4 border-slate-900 opacity-20"></div>
                            <div className="hidden md:block absolute bottom-20 left-10 w-12 h-12 rounded-full border-4 border-slate-900 opacity-20"></div>
                            <div className="hidden md:block absolute top-1/2 right-20 w-4 h-4 bg-slate-900 rounded-full opacity-20"></div>
                        </div>

                        {/* Right Side: Content */}
                        <div className="w-full md:w-7/12 p-6 md:p-12 overflow-y-auto">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{selectedService.shortDesc}</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4 md:mb-6">{selectedService.title}</h2>

                            <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6 md:mb-8">
                                {selectedService.description}
                            </p>

                            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-8">
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6 leading-none">Preparation Guidelines</h3>
                                <ul className="space-y-4">
                                    {selectedService.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-4 text-xs font-bold mt-1">
                                                {idx + 1}
                                            </span>
                                            <span className="text-slate-600 text-sm md:text-base">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => {
                                    navigate('/admin/orders/new', { state: { serviceName: selectedService.title } });
                                }}
                                className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-slate-800 transition-colors flex items-center justify-center group mb-4 md:mb-0"
                            >
                                SCHEDULE AN ORDER
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
