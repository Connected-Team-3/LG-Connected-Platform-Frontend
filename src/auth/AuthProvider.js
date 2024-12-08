// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// 인증 상태를 관리하는 Context 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(''); // 사용자 이름 상태 추가

  useEffect(() => {
    // Get the stored tokens from cookies
    const storedAccessToken = Cookies.get('token');
    const storedUserName = Cookies.get('userName'); // 저장된 사용자 이름 가져오기
    if (storedAccessToken) {
      setToken(storedAccessToken);
      setIsAuthenticated(true);
    }
    if(storedUserName) {
      setUserName(storedUserName);
    } 
  }, []);

  const login = (token, userName) => {
    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
    Cookies.set('userName', userName, { expires: 7, secure: true, sameSite: 'Strict' }); // 사용자 이름 쿠키에 저장

    setToken(token);
    setUserName(userName); // 로그인 시 사용자 이름 저장
    setIsAuthenticated(true);
    console.log('사용자 이름:', userName);
    console.log('쿠키에 저장된 사용자 이름:', Cookies.get('userName'));
  };

  const logout = () => {
    // Remove tokens from cookies
    Cookies.remove('token');
    
    setToken(null);
    setUserName(''); // 사용자 이름 초기화
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        userName,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
