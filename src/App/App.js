import {useContext, useState} from 'react';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import {BrowserRouter as Router} from 'react-router-dom'; // React Router 추가
import Main from '../views/Main';
import {useBackHandler, useCloseHandler, useDocumentEvent} from './AppState';
import {isDevServe} from '../libs/utils';
import DetailPanel from '../views/DetailPanel';
import {PanelContext} from '../views/Context';
import SettingPanel from '../views/SettingPanel';
import VideoListPanel from '../views/VideoListPanel';
import VideoStreamingPanel from '../views/VideoStreamingPanel';
import Playlist from '../views/Playlist'; // 추가된 Playlist 컴포넌트
import {AuthProvider} from '../auth/AuthProvider';
import { AxiosInterceptor } from '../auth/axiosInstance';
import LoginPage from '../views/LoginPanel';
import VideoUploadPanel from '../views/VideoUploadPanel';

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
    const {name, data} = item;
    switch (name) {
        case 'main':
            return <VideoListPanel key={name} data={data} />;
        case 'video':
            return <VideoStreamingPanel key={name} data={data} />;
        case 'playlist':
            return <Playlist key={name} data={data} />;
        case 'setting':
            return <SettingPanel key={name} data={data} />;
        case 'login':
            return <LoginPage key={name} data={data} />;
        case 'videoUpload':
            return <VideoUploadPanel key={name} data={data} />;
        default:
            return <Main key={name} />;
    }
};

const App = props => {
    const [skinVariants, setSkinVariants] = useState({highContrast: false});
    const handleBack = useBackHandler();
    const handleClose = useCloseHandler();
    useDocumentEvent(setSkinVariants);
    const {panelData} = useContext(PanelContext);

    console.log(panelData); // panelData 확인용

    return (
        <AuthProvider>
            <AxiosInterceptor>
                <Router>
                    <Panels
                        {...props}
                        index={panelData.length - 1}
                        skinVariants={skinVariants}
                        onBack={handleBack}
                        onClose={handleClose}
                    >
                        {panelData.map(mapper)}
                    </Panels>
                </Router>
            </AxiosInterceptor>
        </AuthProvider>
    );
};

export default ThemeDecorator(App);
