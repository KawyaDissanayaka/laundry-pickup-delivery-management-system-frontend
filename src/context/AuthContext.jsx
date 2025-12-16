/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage to avoid setting state inside useEffect
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('laundry_user') : null;
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialUser);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null);

    try {
      const result = await authService.login(email, password);

      if (result.success) {
        const userData = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          address: result.data.address,
          role: result.data.role
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('laundry_user', JSON.stringify(userData));
        return userData;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    localStorage.removeItem('laundry_user');
  };

  const updateUserProfile = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('laundry_user', JSON.stringify(newUser));
  };

  const register = async (userData) => {
    setError(null);

    try {
      const result = await authService.register(userData);

      if (result.success) {
        const newUser = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          address: result.data.address,
          role: result.data.role
        };

        // Auto-login after registration
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('laundry_user', JSON.stringify(newUser));
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUserProfile, register, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
