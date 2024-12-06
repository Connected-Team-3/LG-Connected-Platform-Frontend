// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// 인증 상태를 관리하는 Context 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get the stored tokens from cookies
    const storedAccessToken = Cookies.get('token');

    if (storedAccessToken) {
      setToken(storedAccessToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });

    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove tokens from cookies
    Cookies.remove('token');
    
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
