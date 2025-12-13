import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check local storage for persistent login
    const storedUser = localStorage.getItem('customer_user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Mock login - accept any email/password for now, or specific ones
    // In a real app, API call goes here
    const mockUser = {
        name: 'John Doe',
        email: email,
        id: 'cust_001'
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('customer_user', JSON.stringify(mockUser));
    return true; 
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('customer_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
