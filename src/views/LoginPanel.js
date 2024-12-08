// src/LoginPage.js
import React, { useState, useContext } from 'react';
import {Header, Panel} from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import { useAuth } from '../auth/AuthProvider';
import axiosInstance from '../auth/axiosInstance';
import Cookies from 'js-cookie'; // Import js-cookie
import {PanelContext} from './Context';

import css from './LoginPanel.module.less';

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
      const response = await axiosInstance.post('/api/user/login', {
        loginId: username,
        password: password,
      });
      console.log('로그인 응답 받음:', response); // 응답 로그
      
      // 응답 구조에 맞게 수정
      if (response.data?.success && response.data?.result?.data?.token) {
        login(response.data.result.data.token, username);
        goToMain();
        //setPanelData(prev => [...prev, {name: 'video', data: {index}}]);
      } else {
        setLoginCheck(true); // 로그인 오류 시 오류 메시지 표시
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setLoginCheck(true); // 로그인 실패 시 오류 메시지 표시
    }
  };
  
  const goToMain = () => {
    // 로그인 성공 시 main 화면으로 이동
    setPanelData(prev => [...prev, { name: 'main', data: { index: index + 1 } }]);
  };

  const goToSignup = () => {
    // "계정이 없나요?" 클릭 시 signup 화면으로 이동
    setPanelData(prev => [...prev, { name: 'signup', data: { index: index + 1 } }]);
  };

  const handleUsernameComplete = (e) => {
    setUsername(e.value); // onComplete에서 setUsername 호출
  };

  // password 입력 완료 처리
  const handlePasswordComplete = (e) => {
    setPassword(e.value); // onComplete에서 setPassword 호출
  };

  return (
    <Panel {...rest} className={css.loginPanel}>
      <Header title="로그인" />
      <div className={css.formContainer}>
      <Input
        placeholder="사용자명"
        value={username}
        onComplete={handleUsernameComplete} // onComplete 이벤트로 처리
        className={css.inputField}
        autoFocus
      />
      <Input
        placeholder="비밀번호"
        type="password"
        value={password}
        onComplete={handlePasswordComplete} // onComplete 이벤트로 처리
        className={css.inputField}
      />
      <Button onClick={handleLogin} className={css.loginButton}>로그인</Button>
      {loginCheck && <p className={css.errorText}>로그인 실패. 사용자명과 비밀번호를 확인하세요.</p>}
       {/* "계정이 없나요?" 버튼 추가 */}
       <Button onClick={goToSignup} className={css.signupButton}>
        계정이 없나요?
      </Button>
      </div>
    </Panel>
  );
};

export default LoginPage;
