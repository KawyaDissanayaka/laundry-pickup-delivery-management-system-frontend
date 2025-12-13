# Laundry Pickup & Delivery Management System

A comprehensive web application for managing laundry pickup, delivery, and order tracking. This system features a customer-facing frontend for booking services and an administration dashboard for managing orders and logistics.

![Laundry Express](https://images.unsplash.com/photo-1545173168-9f1947eebb8f?q=80&w=2671&auto=format&fit=crop)

## 🚀 Features

### Customer Portal
- **Home & Landing Page**: Services overview and pricing.
- **Authentication**: Secure login and registration.
- **Dashboard**: View active orders, order history, and account details.
- **Order Tracking**: Real-time status updates (Placed, Cleaning, Delivered).

### Admin Dashboard (Restricted)
- **Secure Access**: Role-based authentication (`/admin`).
- **Order Management**: View, update, and track all customer orders.
- **Rider & Customer Management**: Manage delivery personnel and customer database.
- **Analytics**: Key performance metrics and revenue tracking.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Routing**: React Router DOM (v6+)
- **State Management**: React Context API

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/KawyaDissanayaka/laundry-pickup-delivery-management-system.git
    cd laundry-pickup-delivery-management-system
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 Default Credentials

### Admin Login
- **URL**: `/admin/login` or via "Login > Admin Login" on Home.
- **Email**: `admin@laundrygo.com`
- **Password**: `admin123`

### Customer Login
- **URL**: `/login`
- **Email**: (Any valid email format)
- **Password**: (Any password)
