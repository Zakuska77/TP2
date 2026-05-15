import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const [token, setToken] = useState(localStorage.getItem('token') || null);


  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);



  const login = (newToken) => {
    setToken(newToken);
  };



  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };


  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);