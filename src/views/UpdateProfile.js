  import React, { useState, useEffect } from 'react';
  import { Panel, Header } from '@enact/sandstone/Panels';
  import {Input, InputField} from '@enact/sandstone/Input';
  import Button from '@enact/sandstone/Button';
  import { useAuth } from '../auth/AuthProvider'; // 로그인 관련 정보
  import axiosInstance from '../auth/axiosInstance'; // Axios 인스턴스
  import Cookies from 'js-cookie'; // 쿠키 라이브러리

  const UpdateProfile = (props) => {
    const [name, setName] = useState('');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { userName, token } = useAuth(); // 로그인된 사용자 이름을 가져옵니다.

    // 로그인된 사용자 정보를 가져와서 초기 값 설정
    useEffect(() => {
      setLoginId(userName); // 로그인된 사용자 ID
    }, [userName]);

    // 로그인된 사용자 인증 토큰을 확인한 후, 요청 헤더에 포함시켜야 합니다.
  const handleSubmit = async () => {
      //const token = Cookies.get('token'); // 저장된 토큰을 가져옴
      if (!token) {
        setMessage('로그인 후 시도해 주세요.');
        return;
      }
    
      try {
        const response = await axiosInstance.put('/api/user/update', {
          loginId: loginId,
          password: password,
          name: name,
        });
        console.log('회원정보 수정 응답:',response);
        if (response.data?.success) {
          setMessage('프로필이 성공적으로 업데이트되었습니다!');
        } else {
          setMessage(response.data?.message || '프로필 업데이트 실패');
        }
      } catch (error) {
        setMessage('서버 오류로 인해 프로필 업데이트에 실패했습니다.');
        console.error('프로필 업데이트 실패:', error);
      }
    };
    

    // onComplete 이벤트 핸들러
    const handleNameComplete = (e) => {
      setName(e.value); // 이름 입력 완료 시
    };

    const handlePasswordComplete = (e) => {
      setPassword(e.value); // 비밀번호 입력 완료 시
    };

    return (
      <Panel {...props} style={{ height: '100vh', width:'100vw', overflow: 'auto', backgroundColor: '#FAF0E6', margin:'0'}}>
        <Header> 
          <span
            style={{
            color: '#000', // 검은 글씨
            fontWeight: 'bold', // 두꺼운 글씨
            fontSize: '45px', // 글씨 크기
            
          }}
          >
          회원정보 수정
          </span>
          </Header>
        <div style={{ padding: '40px' }}>
        <div
          style={{
              border: '2px solid black', // 검은 외곽선
              borderRadius: '20px', // 둥근 모서리
              overflow: 'hidden', // 내부 요소가 둥근 외곽선 안에서 표시되도록 설정
              padding: '40px', // 내부 여백
              marginBottom: '20px', // 아래 여백
              display: 'flex', // 내부 정렬을 위한 flexbox
              flexDirection: 'column', // 세로 방향 정렬
              alignItems: 'stretch', // 내부 요소를 컨테이너에 맞게 늘림
              gap: '10px', // 요소 간의 간격
              minHeight: '200px'
              
            }}
        >
          <InputField
            placeholder="사용자명"
            value={loginId}
            onChange={(e) => setLoginId(e.value)}
            skin='dark'
            style={{ 
              border: 'none',
              borderRadius: '0px',
              width: '100%',
              boxSizing: 'border-box',
              backgroundColor: '#FAF0E6',
            }}
            readOnly
          />
          <InputField
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.value)}
            skin='dark'
            //onComplete={handlePasswordComplete} // onComplete 이벤트 사용
            style={{ 
              border: 'none',
              borderRadius: '0px',
              width: '100%',
              boxSizing: 'border-box',
              backgroundColor: '#FAF0E6',
            }}
          />
          <InputField
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.value)}
            skin='dark'
            //onComplete={handleNameComplete} // onComplete 이벤트 사용
            style={{ 
              border: 'none',
              borderRadius: '0px',
              width: '100%',
              boxSizing: 'border-box',  
            }}
          />
          <Button onClick={handleSubmit}>회원정보 수정</Button>
          </div>
          {message && <p style={{ color: message.includes('성공') ? 'green' : 'red' }}>{message}</p>}
        </div>
      </Panel>
    );
  };

  export default UpdateProfile;
