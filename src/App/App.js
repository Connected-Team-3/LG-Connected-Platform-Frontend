import { useContext, useState, useEffect } from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import Main from '../views/Main';
import { useBackHandler, useCloseHandler, useDocumentEvent } from './AppState';
import { isDevServe } from '../libs/utils';
import DetailPanel from '../views/DetailPanel';
import { PanelContext } from '../views/Context';
import SettingPanel from '../views/SettingPanel';
import VideoListPanel from '../views/VideoListPanel';
import VideoStreamingPanel from '../views/VideoStreamingPanel';
import LoginPage from '../views/LoginPage'; // 로그인 페이지 추가

// 실습 : 동적 panel 이동 기능 구현하기

/* istanbul ignore next */
if (isDevServe()) {
  window.webOSSystem = {
    highContrast: 'off',
    close: () => {},
    platformBack: () => {},
    PmLogString: () => {},
    screenOrientation: 'landscape',
    setWindowOrientation: () => {}
  };
}

const mapper = item => {
  const { name, data } = item;
  switch (name) {
    case 'main':
      return <VideoListPanel key={name} data={data} />;
    case 'video':
      return <VideoStreamingPanel key={name} data={data} />;
    case 'setting':
      return <SettingPanel key={name} data={data} />;
    case 'login':
      return <LoginPage key={name} />;  // 로그인 페이지 추가
    default:
      return <Main key={name} />;
  }
};

const App = props => {
  const [skinVariants, setSkinVariants] = useState({ highContrast: false });
  const handleBack = useBackHandler();
  const handleClose = useCloseHandler();
  useDocumentEvent(setSkinVariants);
  const { panelData, setPanelData } = useContext(PanelContext);

  // 로그인 상태 체크 및 초기화
  useEffect(() => {
    // webOSService의 getItem 메서드를 사용하여 JWT 확인
    const request = {
      "id": "loadJWT",
      "key": "jwt"
    };

    webOS.service.request("luna://com.webos.service.storage", {
      method: "getItem",
      parameters: request,
      onSuccess: function(response) {
        const token = response.value;
        if (token) {
          // 인증된 경우 main 페이지로 이동
          setPanelData([{ name: 'main', data: {} }]);
        } else {
          // 인증되지 않은 경우 login 페이지로 이동
          setPanelData([{ name: 'login', data: {} }]);
        }
      },
      onFailure: function(error) {
        console.log("JWT 로드 실패", error);
      }
    });
  }, [setPanelData]);

  return (
    <Panels
      {...props}
      index={panelData.length - 1}
      skinVariants={skinVariants}
      onBack={handleBack}
      onClose={handleClose}
    >
      {panelData.map(mapper)}
    </Panels>
  );
};

export default ThemeDecorator(App);
