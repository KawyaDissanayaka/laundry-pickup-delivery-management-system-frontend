/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import { mockCustomers } from '../data/mockCustomers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage to avoid setting state inside useEffect
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('laundry_user') : null;
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialUser);

  const login = (email, password) => {
    // Mock login logic - Auto-detect role based on credentials
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
    } else if (email === 'employee@laundrygo.com' && password === 'employee123') {
      const employeeUser = {
        name: 'John Staff',
        email: email,
        role: 'employee',
        id: 'emp_001'
      };
      setUser(employeeUser);
      setIsAuthenticated(true);
      localStorage.setItem('laundry_user', JSON.stringify(employeeUser));
      return employeeUser;
    } else if (email === 'rider@laundrygo.com' && password === 'rider123') {
      const riderUser = {
        name: 'Mike Rider',
        email: email,
        role: 'rider',
        id: 'rider_001'
      };
      setUser(riderUser);
      setIsAuthenticated(true);
      localStorage.setItem('laundry_user', JSON.stringify(riderUser));
      return riderUser;
    } else {
      // Check if it matches a mock customer
      const existingCustomer = mockCustomers.find(c => c.email === email);

      const customerUser = existingCustomer ? {
        ...existingCustomer,
        role: 'customer'
      } : {
        // Fallback for new/unknown emails
        name: 'John Doe',
        email: email,
        role: 'customer',
        id: 'cust_new' // distinct ID so it doesn't accidentally match if we had generic hardcoded ones
      };

      setUser(customerUser);
      setIsAuthenticated(true);
      localStorage.setItem('laundry_user', JSON.stringify(customerUser));
      return customerUser;
    }
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
