# Laundry Management System - Frontend Analysis Report

This document provides a comprehensive analysis of the React frontend for the Laundry Management System, designed to serve as a specification for rebuilding the backend from scratch.

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [Forms and User Inputs](#forms-and-user-inputs)
3. [Dashboard Data Requirements](#dashboard-data-requirements)
4. [Authentication & Authorization](#authentication--authorization)
5. [Order Flow in Frontend](#order-flow-in-frontend)
6. [Data Models](#data-models)
7. [Problems/Issues Identified](#problemsissues-identified)

---

## 1. API ENDPOINTS

### Base Configuration
- **Base URL**: `http://localhost:8080` (configurable via `VITE_API_BASE_URL`)
- **Authentication**: Bearer token stored in localStorage
- **Content-Type**: `application/json`

### Authentication Endpoints

#### POST `/login`
- **File**: `src/context/AuthContext.jsx`
- **Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```
- **Expected Response**:
```json
{
  "token": "jwt_token_string",
  "user": {
    "id": "number",
    "username": "string",
    "email": "string",
    "role": "string", // admin, customer, employee, rider
    "fullName": "string",
    "phone": "string",
    "address": "string"
  }
}
```
- **Navigation Logic**:
  - `admin` → `/admin`
  - `employee` → `/employee-dashboard`
  - `rider` → `/rider-dashboard`
  - `customer` → `/customer-dashboard`

#### POST `/register`
- **File**: `src/context/AuthContext.jsx`
- **Request Body**:
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "role": "CUSTOMER", // Fixed role for registration
  "fullName": "string",
  "phone": "string",
  "address": "string"
}
```
- **Expected Response**: Same as `/login`

### Order Management Endpoints

#### GET `/orders` (Admin)
- **File**: `src/services/orderService.js`
- **Method**: `GET`
- **Response**: Array of Order objects (see Data Models section)

#### GET `/orders/{id}` (All Roles)
- **File**: `src/services/orderService.js`
- **Method**: `GET`
- **Response**: Single Order object

#### PUT `/orders/{id}` (Admin)
- **File**: `src/services/orderService.js`
- **Method**: `PUT`
- **Request Body**: Partial Order object with updates

#### DELETE `/orders/{id}` (Admin)
- **File**: `src/services/orderService.js`
- **Method**: `DELETE`
- **Response**: 200 OK

### Customer Endpoints

#### GET `/customer/orders`
- **File**: `src/services/orderService.js`
- **Method**: `GET`
- **Response**: Array of Order objects for authenticated customer

#### POST `/customer/orders`
- **File**: `src/services/orderService.js`
- **Method**: `POST`
- **Request Body**:
```json
{
  "items": [
    {
      "name": "string",
      "service": "string",
      "quantity": "number",
      "price": "number"
    }
  ],
  "totalAmount": "number",
  "serviceType": "string",
  "address": "string",
  "progressNote": "string"
}
```

#### GET `/customer/orders/{id}`
- **File**: `src/context/AuthContext.jsx` (referenced)
- **Method**: `GET`
- **Response**: Single Order object

#### GET `/customer/dashboard/stats`
- **File**: `src/pages/CustomerDashboard.jsx`
- **Method**: `GET`
- **Expected Response**:
```json
{
  "totalOrders": "number",
  "activeOrders": "number",
  "completedOrders": "number",
  "totalSpent": "number"
}
```

#### PUT `/customer/profile`
- **File**: `src/context/AuthContext.jsx` (referenced)
- **Method**: `PUT`
- **Request Body**: User profile updates

### Employee Endpoints

#### GET `/employee/orders`
- **File**: `src/services/orderService.js`
- **Method**: `GET`
- **Response**: Array of Order objects for authenticated employee

#### GET `/employee/orders/{id}`
- **File**: `src/services/orderService.js`
- **Method**: `GET`
- **Response**: Single Order object

#### PUT `/employee/orders/{id}/status`
- **File**: `src/services/orderService.js`
- **Method**: `PUT`
- **Request Body**:
```json
{
  "status": "string" // PLACED, ASSIGNED, AT_LAUNDRY, PROCESSING, READY, DELIVERED, COMPLETED
}
```

#### PUT `/employee/orders/{id}/progress`
- **File**: `src/services/orderService.js`
- **Method**: `PUT`
- **Request Body**:
```json
{
  "progressNote": "string" // Can be JSON string or plain text
}
```

#### GET `/employee/dashboard/stats`
- **File**: Referenced in EmployeeDashboard (not directly called)
- **Expected Response**:
```json
{
  "pendingOrders": "number",
  "processedToday": "number"
}
```

### Rider Endpoints

#### GET `/rider/orders`
- **File**: `src/services/orderService.js`
- **Method**: `GET`
- **Response**: Array of Order objects for authenticated rider

#### GET `/rider/orders/{id}`
- **File**: `src/services/orderService.js`
- **Method**: `GET`
- **Response**: Single Order object

#### PUT `/rider/orders/{id}/status`
- **File**: `src/services/orderService.js`
- **Method**: `PUT`
- **Request Body**: Same as employee status update

#### POST `/rider/orders/{id}/confirm-pickup`
- **File**: Referenced in orderService (not directly called)
- **Method**: `POST`
- **Expected Response**: Updated Order object

#### GET `/rider/dashboard/stats`
- **File**: `src/pages/RiderDashboard.jsx`
- **Method**: `GET`
- **Expected Response**:
```json
{
  "pendingOrders": "number",
  "commission": "number"
}
```

#### GET `/rider/dashboard/pending-pickup`
- **File**: Referenced in orderService (not directly called)
- **Method**: `GET`
- **Response**: Array of orders with PLACED status

### Admin Endpoints

#### GET `/admin/orders`
- **File**: `src/services/orderService.js`
- **Method**: `GET`
- **Response**: Array of all Order objects

#### GET `/admin/orders/{id}`
- **File**: `src/services/orderService.js`
- **Method**: `GET`
- **Response**: Single Order object

#### PUT `/admin/orders/{id}`
- **File**: `src/services/orderService.js`
- **Method**: `PUT`
- **Request Body**: Partial Order object

#### POST `/admin/orders/{id}/assign-employee`
- **File**: `src/services/orderService.js`
- **Method**: `POST`
- **Request Body**:
```json
{
  "employeeId": "number"
}
```

#### POST `/admin/orders/{id}/assign-rider`
- **File**: `src/services/orderService.js`
- **Method**: `POST`
- **Request Body**:
```json
{
  "riderId": "number"
}
```

#### PUT `/admin/orders/{id}/status`
- **File**: `src/services/orderService.js`
- **Method**: `PUT`
- **Request Body**: Same as other status updates

#### GET `/admin/orders/status/{status}`
- **File**: Referenced in orderService (not directly called)
- **Method**: `GET`
- **Response**: Array of orders with specific status

#### DELETE `/admin/orders/{id}`
- **File**: `src/services/orderService.js`
- **Method**: `DELETE`
- **Response**: 200 OK

#### GET `/admin/analytics/stats`
- **File**: `src/pages/Dashboard.jsx`
- **Method**: `GET`
- **Expected Response**:
```json
{
  "totalRevenue": "number",
  "companyRevenue": "number",
  "activeOrders": "number",
  "activeRiders": "number",
  "newCustomers": "number"
}
```

#### GET `/admin/users`
- **File**: Referenced in AdminController (not directly called)
- **Method**: `GET`
- **Response**: Array of User objects

#### GET `/admin/users/{id}`
- **File**: Referenced in AdminController (not directly called)
- **Method**: `GET`
- **Response**: Single User object

#### POST `/admin/employees`
- **File**: Referenced in AdminController (not directly called)
- **Method**: `POST`
- **Request Body**: User object with role="EMPLOYEE"

#### POST `/admin/riders`
- **File**: Referenced in AdminController (not directly called)
- **Method**: `POST`
- **Request Body**: User object with role="RIDER"

---

## 2. FORMS AND USER INPUTS

### Registration Form
- **File**: `src/pages/Register.jsx`
- **Fields Collected**:
  - `name` (Full Name) - Required, min 2 characters
  - `username` - Required, min 4 characters
  - `email` - Required, valid email format
  - `phone` - Required, Sri Lankan phone format validation
  - `address` - Required, min 5 characters
  - `password` - Required, min 8 characters, uppercase, lowercase, number
  - `confirmPassword` - Required, must match password
  - `agreeToTerms` - Required checkbox

- **Validation Rules**:
  - Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Phone: `/^(\+94|0)?[0-9]{9,10}$/` (Sri Lankan format)
  - Password: At least 8 chars, uppercase, lowercase, number
  - Password strength indicator (Weak/Medium/Strong)

- **Submission**: Calls `register()` function → `POST /register`

### Login Form
- **File**: `src/pages/Login.jsx`
- **Fields Collected**:
  - `username` - Required
  - `password` - Required

- **Submission**: Calls `login()` function → `POST /login`

### Admin Login Form
- **File**: `src/pages/AdminLogin.jsx`
- **Fields Collected**:
  - `email` - Required (but uses login function with username)
  - `password` - Required

- **Note**: This form has issues - uses email field but calls login with username

### Order Creation Form (Customer Dashboard)
- **File**: `src/pages/CustomerDashboard.jsx` (NewOrderModal component)
- **Fields Collected**:
  - `service` - Select dropdown (Wash & Fold, Dry Cleaning, Ironing Only, Household Items)
  - `date` - Date picker
  - `time` - Select dropdown (Morning, Afternoon, Evening)
  - `items` - Number input (estimated item count)
  - `instructions` - Textarea (optional special instructions)

- **Price Calculation**:
  - Wash & Fold: 450.0 LKR
  - Dry Cleaning: 1500.0 LKR
  - Ironing Only: 600.0 LKR
  - Household Items: 2400.0 LKR
  - Total = basePrice × itemCount

- **Submission**: Creates order object → `POST /customer/orders`

### Profile Update Form (Customer Dashboard)
- **File**: `src/pages/CustomerDashboard.jsx` (ProfileTab component)
- **Fields Collected**:
  - `name` - Text input
  - `email` - Email input
  - `phone` - Phone input
  - `address` - Textarea

- **Submission**: Calls `updateUserProfile()` → `PUT /customer/profile`

---

## 3. DASHBOARD DATA REQUIREMENTS

### Customer Dashboard
- **File**: `src/pages/CustomerDashboard.jsx`
- **Data Sources**:
  - `GET /customer/dashboard/stats` - Dashboard metrics
  - `GET /customer/orders` - User's orders
  - Real-time polling every 30 seconds

- **Displayed Data**:
  - **Metrics**: Total Orders, Active Orders, Completed Orders, Total Spent
  - **Live Tracker**: Current active order with progress steps
  - **Recent Activity**: Last 5 orders with ID, service type, pickup status, amount
  - **Order History**: All orders with full details

- **Progress Steps**: `['Placed', 'Sorting', 'Washing', 'Drying', 'Folding', 'Ready', 'Delivered']`

### Employee Dashboard
- **File**: `src/pages/EmployeeDashboard.jsx`
- **Data Sources**:
  - `GET /employee/orders` - Assigned orders
  - Mock data: `mockDrivers`, `mockCustomers`
  - Real-time polling every 10 seconds

- **Displayed Data**:
  - **Stats**: Pending Orders, Processed Today, Weekly Hours, Accrued Salary (hardcoded)
  - **Work Queue**: Assigned tasks with service, items, status, priority, due time
  - **Customer Info**: Name, address, order history (from mock data)

- **Status Updates**: Can update order status via `PUT /employee/orders/{id}/status`

### Rider Dashboard
- **File**: `src/pages/RiderDashboard.jsx`
- **Data Sources**:
  - `GET /rider/orders` - Assigned orders
  - `GET /rider/dashboard/stats` - Dashboard metrics
  - Real-time polling every 10 seconds

- **Displayed Data**:
  - **Stats**: Completed deliveries, Pending tasks, Total earnings
  - **Assignments**: Pickup/Delivery tasks with address, time, customer, status
  - **Availability Toggle**: Online/Offline status (UI only)

### Admin Dashboard
- **File**: `src/pages/Dashboard.jsx`
- **Data Sources**:
  - `GET /admin/analytics/stats` - Analytics data
  - `GET /admin/orders` - All orders
  - Real-time polling every 30 seconds

- **Displayed Data**:
  - **Metrics**: Total Revenue, Active Orders, Active Riders, Customers
  - **Revenue Analytics**: Monthly revenue chart (calculated from order data)
  - **Recent Orders**: Last 5 orders with details

---

## 4. AUTHENTICATION & AUTHORIZATION

### Authentication Flow
1. **Login**: `POST /login` with username/password
2. **Token Storage**: JWT stored in localStorage under 'user' key
3. **Token Usage**: Bearer token added to all API requests via axios interceptor
4. **Auto-Login**: Check localStorage on app mount

### Token Structure
```javascript
{
  "token": "jwt_token",
  "user": {
    "id": number,
    "username": string,
    "email": string,
    "role": string, // normalized to lowercase
    "name": string, // alias for fullName
    "fullName": string
  }
}
```

### User Roles
- **admin**: Full system access
- **customer**: Can create/view own orders
- **employee**: Can process assigned orders
- **rider**: Can handle pickups/deliveries

### Protected Routes
- **Files**: `src/components/ProtectedRoute.jsx`, `src/components/ProtectedAdminRoute.jsx`
- **Implementation**: Role-based route protection using AuthContext
- **Admin Routes**: Additional admin-only protection

### Auth Context
- **File**: `src/context/AuthContext.jsx`
- **Provides**: `user`, `loading`, `login`, `register`, `logout`, `isAuthenticated`
- **Normalization**: Roles normalized to lowercase, name alias added for compatibility

---

## 5. ORDER FLOW IN FRONTEND

### Customer Order Creation Flow
1. **Order Form**: Customer fills service type, date, time, items, instructions
2. **Price Calculation**: Frontend calculates total based on service × items
3. **Quotation Preview**: Shows order details with calculated price
4. **Confirmation**: Customer confirms → `POST /customer/orders`
5. **Dashboard Refresh**: Auto-refresh to show new order

### Status Values Used in Frontend
- **Backend Statuses**: `PLACED, ASSIGNED, AT_LAUNDRY, PROCESSING, READY, DELIVERED, COMPLETED, CANCELLED`
- **Frontend Labels**: `Placed, Rider Assigned, At Laundry, Cleaning, Ready, Delivered, Completed, Cancelled`
- **Mock Data Statuses**: `Placed, Picked Up, Cleaning, Ready, Out for Delivery, Delivered`

### Order Status Mapping
```javascript
const mapStatusFromBackend = (rawStatus) => {
  switch (code) {
    case 'PLACED': return { code, label: 'Placed' };
    case 'ASSIGNED': return { code, label: 'Rider Assigned' };
    case 'AT_LAUNDRY': return { code, label: 'At Laundry' };
    case 'PROCESSING': return { code, label: 'Cleaning' };
    case 'READY': return { code, label: 'Ready' };
    case 'DELIVERED': return { code, label: 'Delivered' };
    case 'COMPLETED': return { code, label: 'Completed' };
    case 'CANCELLED': return { code, label: 'Cancelled' };
  }
}
```

### Employee Processing Flow
1. **View Assigned Orders**: `GET /employee/orders`
2. **Update Status**: `PUT /employee/orders/{id}/status`
3. **Add Progress Notes**: `PUT /employee/orders/{id}/progress`
4. **Mark Completed**: Update status to 'COMPLETED'

### Rider Delivery Flow
1. **View Assignments**: `GET /rider/orders`
2. **Confirm Pickup**: `POST /rider/orders/{id}/confirm-pickup` (referenced)
3. **Update Status**: `PUT /rider/orders/{id}/status`
4. **View Earnings**: `GET /rider/dashboard/stats`

---

## 6. DATA MODELS

### User Object (Frontend)
```javascript
{
  id: number,
  username: string,
  email: string,
  role: string, // lowercase: admin, customer, employee, rider
  name: string, // alias for fullName
  fullName: string,
  phone: string,
  address: string,
  token: string // JWT
}
```

### Order Object (Frontend - Transformed)
```javascript
{
  id: number,
  customerId: number,
  customerName: string,
  items: [
    {
      name: string,
      service: string,
      quantity: number,
      price: number
    }
  ],
  totalAmount: number,
  status: string, // statusCode for logic
  statusLabel: string, // for display
  serviceType: string,
  pickupStatus: string, // PICKED | NOT_PICKED
  pickupDate: string, // ISO datetime
  deliveryDate: string, // ISO datetime
  completedAt: string, // ISO datetime
  driverId: number, // rider ID
  staffId: number, // employee ID
  address: string,
  progress: object, // parsed progressNote JSON
  createdAt: string // ISO datetime
}
```

### Order Object (Backend - Expected)
```javascript
{
  id: number,
  customer: {
    id: number,
    fullName: string,
    username: string,
    address: string
  },
  employee: {
    id: number,
    fullName: string
  },
  rider: {
    id: number,
    fullName: string
  },
  items: [
    {
      id: number,
      name: string,
      service: string,
      quantity: number,
      price: number
    }
  ],
  totalAmount: number,
  status: string, // PLACED, ASSIGNED, AT_LAUNDRY, PROCESSING, READY, DELIVERED, COMPLETED
  serviceType: string,
  itemCount: number,
  address: string,
  createdAt: string, // ISO datetime
  completedAt: string, // ISO datetime
  progressNote: string // JSON string
}
```

### OrderCreateDTO (Backend - Expected)
```javascript
{
  items: [
    {
      name: string,
      service: string,
      quantity: number,
      price: number
    }
  ],
  totalAmount: number,
  serviceType: string,
  address: string,
  progressNote: string
}
```

---

## 7. PROBLEMS/ISSUES IDENTIFIED

### Hardcoded Values
1. **Employee Dashboard Stats**:
   - `hours: 42` (hardcoded)
   - `salary: 96000` (hardcoded)

2. **Service Prices**:
   - Wash & Fold: 450.0 LKR
   - Dry Cleaning: 1500.0 LKR
   - Ironing Only: 600.0 LKR
   - Household Items: 2400.0 LKR

3. **Phone Numbers**:
   - Rider phone: `'077 123 4567'` (TODO comment)

4. **Polling Intervals**:
   - Customer/Admin: 30 seconds
   - Employee/Rider: 10 seconds

### Mock Data Files
1. **mockOrders.js**: Contains sample orders with different status format
2. **mockCustomers.js**: Contains customer data with order statistics
3. **mockDrivers.js**: Contains driver data with location and vehicle info
4. **mockEmployees.js**: Contains employee data with salary info
5. **mockMessages.js**: Contains system messages (not analyzed)

### Inconsistencies
1. **Status Formats**:
   - Backend expects: `PLACED, ASSIGNED, AT_LAUNDRY, PROCESSING, READY, DELIVERED, COMPLETED`
   - Mock data uses: `Placed, Picked Up, Cleaning, Ready, Out for Delivery, Delivered`
   - Frontend mapping handles conversion but creates confusion

2. **Field Names**:
   - Frontend uses: `driverId`, `staffId`
   - Backend expected: `rider.id`, `employee.id`

3. **Admin Login**:
   - Form uses `email` field but calls login with `username`
   - Should either change field to username or handle email login

### Missing API Integrations
1. **Employee Dashboard Stats**: Referenced but not called
2. **Rider Confirm Pickup**: Referenced in orderService but not used
3. **User Management**: Admin endpoints referenced but not implemented in frontend
4. **Customer Profile Update**: Referenced but may not be fully implemented

### Data Flow Issues
1. **Mixed Data Sources**: Some components use mock data, others use API
2. **Inconsistent Error Handling**: Some API calls have error handling, others don't
3. **State Management**: Some components don't refresh data after updates

### Frontend-Specific Issues
1. **AdminLogin Component**: Uses synchronous login call (should be async)
2. **Role Normalization**: Done in frontend but should be consistent in backend
3. **Progress Notes**: Stored as JSON string but frontend expects parsed object

---

## RECOMMENDATIONS FOR BACKEND IMPLEMENTATION

1. **Use the exact status values** from the frontend mapping
2. **Implement all listed endpoints** with the specified request/response formats
3. **Handle JWT authentication** with Bearer tokens
4. **Return consistent data structures** matching the transformed frontend models
5. **Implement proper error responses** with meaningful messages
6. **Consider the hardcoded values** as starting points for configuration
7. **Address the inconsistencies** noted in the data models
8. **Implement proper CORS** for the frontend domains

This analysis provides a complete specification for rebuilding the backend to match the existing frontend requirements.
