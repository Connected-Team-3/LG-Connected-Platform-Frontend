import React, { useState, useContext } from 'react';
import { Header, Panel } from '@enact/sandstone/Panels';
import {Input,InputField} from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';
import axiosInstance from '../auth/axiosInstance';
import { PanelContext } from './Context';
import alert from '@enact/sandstone/Alert'
import { useAuth } from '../auth/AuthProvider';

import css from './SignupPanel.module.less';

const SignupPage = props => {
  const { data, ...rest } = props;
  const index = data?.index ?? 0;
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { panelData, setPanelData } = useContext(PanelContext);
  const { login } = useAuth(); // 로그인 함수 가져오기
  const handleSignup = async () => {
    try {
      const response = await axiosInstance.post('/api/user/register', {
        loginId,
        password,
        name,
      });
      console.log('회원가입 응답 받음:', response); // 응답 로그

      if (response.data?.success) {
        const { token, loginID} = response.data.result.data;
        login(token, loginID); // 받은 토큰을 AuthContext에 저장
        //alert('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.');
        setPanelData(prev => [...prev, { name: 'login', data: { index: index + 1 } }]); // 로그인 패널로 이동
      } 
      else {
        if (response.data?.code === -300) {
            setErrorMessage('이미 회원가입된 유저입니다.');
          } else {
            setErrorMessage('회원가입에 실패했습니다. 정보를 다시 확인하세요.');
          }
  
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      setErrorMessage('서버 오류로 회원가입에 실패했습니다.');
    }
  };

  return (
    <Panel {...rest} className={css.signupPanel}>
      <Header
        title={<span className={css.customTitle}>회원가입</span>} 
        back
        onBack={() => setPanelData(prev => prev.slice(0, -1))} // 뒤로 가기 버튼 처리
      />
      <InputField
        placeholder="사용자명 (ID)"
        value={loginId}
        onChange={(e) => setLoginId(e.value)}
        style={{ marginBottom: '10px' }}
        skin='dark'
      />
      <InputField
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.value)}
        style={{ marginBottom: '10px' }}
        skin='dark'
      />
      <InputField
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.value)}
        style={{ marginBottom: '20px' }}
        skin='dark'
      />
      <Button onClick={handleSignup}>회원가입</Button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </Panel>
  );
};

export default SignupPage;
