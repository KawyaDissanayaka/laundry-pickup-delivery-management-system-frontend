export const mockOrders = [
    {
        id: 'ORD-001',
        customerId: 'CUST-001',
        customerName: 'Alice Johnson',
        items: [
            { name: 'Men\'s Shirt', service: 'Wash & Iron', quantity: 5, price: 2.50 },
            { name: 'Trousers', service: 'Dry Clean', quantity: 2, price: 5.00 }
        ],
        totalAmount: 22.50,
        status: 'Cleaning', // Placed, Picked Up, Cleaning, Ready, Out for Delivery, Delivered
        pickupDate: '2025-12-14T09:00:00',
        deliveryDate: '2025-12-16T18:00:00',
        driverId: 'DRV-001',
        address: '123 Maple Ave, Apt 4B',
    },
    {
        id: 'ORD-002',
        customerId: 'CUST-002',
        customerName: 'Bob Smith',
        items: [
            { name: 'Comforter (King)', service: 'Wash & Fold', quantity: 1, price: 15.00 }
        ],
        totalAmount: 15.00,
        status: 'Placed',
        pickupDate: '2025-12-13T14:00:00',
        deliveryDate: '2025-12-15T10:00:00',
        driverId: null,
        address: '456 Oak Dr',
    },
    {
        id: 'ORD-003',
        customerId: 'CUST-001',
        customerName: 'Alice Johnson',
        items: [
            { name: 'Bed Sheets', service: 'Wash & Iron', quantity: 4, price: 3.00 }
        ],
        totalAmount: 12.00,
        status: 'Delivered',
        pickupDate: '2025-12-10T09:00:00',
        deliveryDate: '2025-12-12T17:00:00',
        driverId: 'DRV-002',
        address: '123 Maple Ave, Apt 4B',
    }
];

export const ORDER_STATUSES = {
    PLACED: 'Placed',
    PICKED_UP: 'Picked Up',
    CLEANING: 'Cleaning',
    READY: 'Ready',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled'
};
