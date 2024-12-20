import {useContext, useState, useEffect } from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import Main from '../views/Main';
import {useBackHandler, useCloseHandler, useDocumentEvent} from './AppState';
import {isDevServe} from '../libs/utils';
import DetailPanel from '../views/DetailPanel';
import {PanelContext} from '../views/Context';
import SettingPanel from '../views/SettingPanel';
import VideoListPanel from '../views/VideoListPanel';
import VideoStreamingPanel from '../views/VideoStreamingPanel';

import {AuthProvider} from '../auth/AuthProvider';
import { AxiosInterceptor } from '../auth/axiosInstance';
import LoginPage from '../views/LoginPanel';
import VideoUploadPanel from '../views/VideoUploadPanel';
import SearchView from '../views/SearchView'
import LaunchScreenPanel from '../views/LaunchScreenPanel'; // LaunchScreen 컴포넌트
import SignupPage from '../views/SignupPanel';
import UpdateProfile from '../views/UpdateProfile';
import Cart from '../views/CartPanel';
import HLSVideo from '../views/HLSVideo';
// 실습 : 동적 panel 이동 기능 구현하기

// For advanced
// 1. context를 생성하여 panel의 name과 전달할 data를 담아 배열에 저장하고 변경 가능한  Provider 구현하세요. (Context.js)
// context 초기 데이터 : [{name: 'main', data: {}}]
// 2. Panels 컴포넌트 children에 패널이 담긴 배열을 리턴하는 함수를 작성하세요(App.js)
//  - useContext를 통해 panel 정보가 담긴 배열을 읽어와 name에 따라 Panel로 변환해 배열을 리턴하는 함수 작성
//  - e.g) name이 detail인 경우 <Detail data={data} />으로 변환하고 배열로 리턴.
// 3. 각 패널에서 다른 패널로 이동할 수 있는 이벤트 핸들러를 각각 구현해보세요
//  - main -> detail -> settings 패널로 이동

// -------------

// For rookie
// 1. git checkout feature/panels
// 2. useBackHandler함수에서 useContext에 정의된 setPanelData 함수를 사용하여 이전 패널로 돌아가는 함수를 작성하세요.

/* istanbul ignore next*/
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
	const {name, data} = item;
	switch (name) {
		case 'launch':
			return <LaunchScreenPanel key={name} data={data} />;
		case 'main':
			return <VideoListPanel key={name} data={data} />;
		case 'video':
			return <VideoStreamingPanel key={`video-${data.video.id}`} data={data} />;
		case 'setting':
			return <SettingPanel key={name} data={data} />;
		case 'login':
			return <LoginPage key={name} data={data} />;
		case 'videoUpload':
			return <VideoUploadPanel key={name} data={data} />;
		case 'search':
			return <SearchView key={name} data={data} />; // SearchView 매핑 추가
		case 'signup':
			return <SignupPage key={name} data = {data} />; //sginup panel 추가
		case 'updateprofile':
			return <UpdateProfile key={name} data = {data} />; //sginup panel 추가
		case 'hls':
			return <HLSVideo key={name} data = {data} />;
		case 'cart':
			return <Cart key={name} data = {data} />; //cart panel 추가
		default:
			return <Main key={name} />;
	}
};

const App = props => {
	const [skinVariants, setSkinVariants] = useState({highContrast: false});
	const handleBack = useBackHandler();
	const handleClose = useCloseHandler();
	useDocumentEvent(setSkinVariants);
	//const {panelData} = useContext(PanelContext);
	// PanelContext에서 panelData와 setPanelData 가져오기
	const {panelData, setPanelData} = useContext(PanelContext);
	console.log(panelData); 
		// LaunchScreen에서 VideoListPanel로 1.5초 후 전환
		useEffect(() => {
			if (panelData[0]?.name === 'launch') {

				const timer = setTimeout(() => {
					setPanelData([{name: 'login', data: {}}]); // VideoListPanel로 전환
				}, 2000);
	
				return () => clearTimeout(timer); // 타이머 정리
			}
		}, [panelData, setPanelData])

	return (
		<AuthProvider>
			<AxiosInterceptor>
		<Panels
			{...props}
			index={panelData.length - 1}
			skinVariants={skinVariants}
			onBack={handleBack}
			onClose={handleClose}
		>
			{panelData.map(mapper)}
		</Panels>
		</AxiosInterceptor>
		</AuthProvider>
	);
};

export default ThemeDecorator(App);
