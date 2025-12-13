/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

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
      return adminUser; // Return user info for redirection
    } else {
      // Default to Customer for any other credentials
      const customerUser = {
        name: 'John Doe',
        email: email,
        role: 'customer',
        id: 'cust_001'
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
