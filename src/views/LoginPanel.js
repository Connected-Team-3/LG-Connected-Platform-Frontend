// src/LoginPage.js
import React, { useState } from 'react';
import { Panel } from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import { useAuth } from '../auth/AuthProvider';
import axiosInstance from '../auth/axiosInstance';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginCheck, setLoginCheck] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/login', { // /login은 API의 로그인 엔드포인트
        username,
        password,
      });

      if (typeof window !== 'undefined' && window.localStorage) {
        // 로그인 성공 시 access_token, refresh_token 저장
        if (response.data && response.data.access_token) {
            //localStorage.setItem('access_token', response.data.access_token);
            //localStorage.setItem('refresh_token', response.data.refresh_token);

            login(response.data.access_token, response.data.refresh_token); // Store tokens in context

            }
        } else {
            setLoginCheck(true); // Display login error message
        }
    } catch (error) {
      console.error('로그인 실패:', error);
      //alert('로그인 실패. 사용자명과 비밀번호를 확인하세요.');
      setLoginCheck(true);
    }
  };

  return (
    <Panel>
        <h2>로그인</h2>
        <div style={{ marginBottom: '10px' }}>
          <Input
            placeholder="사용자명"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button onClick={handleLogin}>로그인</Button>
    </Panel>
  );
};

export default LoginPage;
