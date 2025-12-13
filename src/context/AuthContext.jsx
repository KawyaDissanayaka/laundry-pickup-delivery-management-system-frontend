import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    // Check local storage for persistent login
    const storedUser = localStorage.getItem('laundry_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
