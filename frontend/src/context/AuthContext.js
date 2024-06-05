import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authServices';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error; // Rethrow to handle it in the component
    }
  };

  const signup = async (username, email, password) => {
    try {
      await authService.signup(username, email, password);
      await login(email, password);
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      throw error; // Rethrow to handle it in the component
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
