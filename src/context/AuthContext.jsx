/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import { mockCustomers } from '../data/mockCustomers';
import { mockEmployees } from '../data/mockEmployees';
import { mockDrivers } from '../data/mockDrivers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage to avoid setting state inside useEffect
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('laundry_user') : null;
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialUser);

  const login = (email, password) => {
    // Mock login logic - Auto-detect role based on credentials

    // 1. Admin Check
    if (email === 'admin@laundrygo.com' && password === 'admin123') {
      const adminUser = {
        name: 'Admin User',
        email: email,
        role: 'admin',
        id: 'admin_001'
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('laundry_user', JSON.stringify(adminUser));
      return adminUser;
    }

    // 2. Employee Check
    const existingEmployee = mockEmployees.find(e => e.email === email);
    if (existingEmployee) {
      const employeeUser = {
        ...existingEmployee,
        role: 'employee'
      };
      setUser(employeeUser);
      setIsAuthenticated(true);
      localStorage.setItem('laundry_user', JSON.stringify(employeeUser));
      return employeeUser;
    }

    // 3. Rider Check (Demo mappings)
    const driverEmailMap = {
      'driver1@laundrygo.com': 'DRV-001',
      'rider@laundrygo.com': 'DRV-001',
      'driver2@laundrygo.com': 'DRV-002',
      'driver3@laundrygo.com': 'DRV-003'
    };

    const targetDriverId = driverEmailMap[email];
    if (targetDriverId) {
      const driverData = mockDrivers.find(d => d.id === targetDriverId);
      if (driverData) {
        const riderUser = {
          ...driverData,
          role: 'rider',
          email: email
        };
        setUser(riderUser);
        setIsAuthenticated(true);
        localStorage.setItem('laundry_user', JSON.stringify(riderUser));
        return riderUser;
      }
    }

    // 4. Customer Check (Default)
    const existingCustomer = mockCustomers.find(c => c.email === email);

    const customerUser = existingCustomer ? {
      ...existingCustomer,
      role: 'customer'
    } : {
      // Fallback for new/unknown emails -> Guest Customer
      name: 'Guest Customer',
      email: email,
      role: 'customer',
      id: 'cust_new'
    };

    setUser(customerUser);
    setIsAuthenticated(true);
    localStorage.setItem('laundry_user', JSON.stringify(customerUser));
    return customerUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('laundry_user');
  };

  const updateUserProfile = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('laundry_user', JSON.stringify(newUser));
  };

  const register = (userData) => {
    // Check if email already exists
    const existingCustomers = JSON.parse(localStorage.getItem('laundry_customers') || '[]');
    const emailExists = existingCustomers.some(c => c.email === userData.email);

    if (emailExists) {
      return false; // Email already registered
    }

    // Create new customer
    const newCustomer = {
      id: `CUST-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      role: 'customer',
      joinDate: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
      status: 'Active'
    };

    // Save to localStorage
    existingCustomers.push(newCustomer);
    localStorage.setItem('laundry_customers', JSON.stringify(existingCustomers));

    // Auto-login
    setUser(newCustomer);
    setIsAuthenticated(true);
    localStorage.setItem('laundry_user', JSON.stringify(newCustomer));

    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUserProfile, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
