// src/LoginPage.js
import React, { useState, useContext } from 'react';
import {Header, Panel} from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import { useAuth } from '../auth/AuthProvider';
import axiosInstance from '../auth/axiosInstance';
import Cookies from 'js-cookie'; // Import js-cookie
import {PanelContext} from './Context';

const LoginPage = props => {
	const {data, ...rest} = props;
	const index = data?.index ?? 0;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginCheck, setLoginCheck] = useState(false);
  const {panelData, setPanelData} = useContext(PanelContext);

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/api/user/login', { // /login은 API의 로그인 엔드포인트
        loginId:username,
        password:password,
      });

      if (response.data && response.data.result.data.token) {
        login(response.data.result.data.token);
        //setPanelData(prev => [...prev, {name: 'video', data: {index}}]);
      } else {
        setLoginCheck(true); // 로그인 오류 시 오류 메시지 표시
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setLoginCheck(true); // 로그인 실패 시 오류 메시지 표시
    }
  };

  const handleUsernameComplete = (e) => {
    setUsername(e.value); // onComplete에서 setUsername 호출
  };

  // password 입력 완료 처리
  const handlePasswordComplete = (e) => {
    setPassword(e.value); // onComplete에서 setPassword 호출
  };

  return (
    <Panel>
      <Header title="로그인" />
      <Input
        placeholder="사용자명"
        value={username}
        onComplete={handleUsernameComplete} // onComplete 이벤트로 처리
        style={{ marginBottom: '10px' }}
        autoFocus
      />
      <Input
        placeholder="비밀번호"
        type="password"
        value={password}
        onComplete={handlePasswordComplete} // onComplete 이벤트로 처리
        style={{ marginBottom: '20px' }}
      />
      <Button onClick={handleLogin}>로그인</Button>
      {loginCheck && <p style={{ color: 'red' }}>로그인 실패. 사용자명과 비밀번호를 확인하세요.</p>}
    </Panel>
  );
};

export default LoginPage;
