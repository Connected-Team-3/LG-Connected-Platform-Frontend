// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 인증 상태를 관리하는 Context 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAccessToken = null; //localStorage.getItem('access_token');
        const storedRefreshToken = null; //localStorage.getItem('refresh_token');
    
    

        if (storedAccessToken && storedRefreshToken) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setIsAuthenticated(true);
        }
    }, []);

  const login = (access_token, refresh_token) => {
    //localStorage.setItem('access_token', access_token);
    //localStorage.setItem('refresh_token', refresh_token);
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    //localStorage.removeItem('access_token');
    //ocalStorage.removeItem('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };


  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
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
