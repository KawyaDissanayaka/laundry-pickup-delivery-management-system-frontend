import React from 'react';
import { Truck, Phone, Star, MapPin } from 'lucide-react';
import { mockDrivers } from '../data/mockDrivers';
import Badge from '../components/common/Badge';

export default function Riders() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Rider Management</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    + Add New Rider
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockDrivers.map((driver) => (
                    <div key={driver.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Truck className="h-6 w-6 text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{driver.name}</h3>
                                        <p className="text-xs text-gray-500">ID: {driver.id}</p>
                                    </div>
                                </div>
                                <Badge status={driver.status} />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    {driver.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    Lat: {driver.currentLocation.lat}, Lng: {driver.currentLocation.lng}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    {driver.rating} Rating
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-medium">{driver.totalDeliveries} Deliveries</span>
                            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
