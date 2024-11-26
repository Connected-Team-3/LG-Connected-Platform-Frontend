import React, { useState, useContext } from 'react';
import { Panel, Header, Input, Button, Alert } from '@enact/sandstone';
import { PanelContext } from './Context';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setPanelData } = useContext(PanelContext);

  const handleLogin = async () => {
    // 서버에서 JWT를 받아오는 요청 (예: fetch로 POST 요청)
    try {
      /*const response = await fetch('https://your-api-endpoint/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });*/

      // 가짜 서버 응답 데이터
    const fakeResponse = {
      ok: true,  // 실제 API에서는 응답이 성공적인지 체크하는 부분
      json: () => Promise.resolve({ token: 'fake-jwt-token' }),
    };

    // 실제 fetch 요청 대신 가짜 응답 사용
    const response = fakeResponse;

      if (!response.ok) {
        throw new Error('아이디 또는 비밀번호가 틀렸습니다.');
      }

      // 서버로부터 JWT 받아오기
      const data = await response.json();
      const token = data.token;

       // JWT를 webOS의 Storage API를 통해 저장
      const request = {
        "id": "saveJWT",
        "key": "jwt",
        "value": token,
      };

      // webOSService를 사용하여 JWT 저장
      webOS.service.request("luna://com.webos.service.storage", {
        method: "setItem",
        parameters: request,
        onSuccess: function(response) {
          console.log("JWT saved successfully:", response);

          // 로그인 성공 시 Main 페이지로 이동
          setPanelData([{ name: 'main', data: {} }]);  // 이전 패널을 제거하고 'main'으로 이동
        },
        onFailure: function(error) {
          console.log("Failed to save JWT:", error);
          setErrorMessage("JWT 저장에 실패했습니다.");
        }
      });

    } catch (error) {
      // 로그인 실패 시 오류 메시지 설정
      setErrorMessage(error.message);
    }
  };

  return (
    <Panel>
      <Header title="로그인" subtitle="사용자 인증" />
      <div style={{ padding: '20px' }}>
        <Input
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>로그인</Button>

        {errorMessage && <Alert open={true}>{errorMessage}</Alert>}
      </div>
    </Panel>
  );
};

export default LoginPage;
