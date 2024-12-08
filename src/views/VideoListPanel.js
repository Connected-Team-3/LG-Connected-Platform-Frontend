import MediaOverlay from '@enact/sandstone/MediaOverlay';
import Scroller from '@enact/sandstone/Scroller';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {Header, Panel} from '@enact/sandstone/Panels';
import {scaleToRem} from '@enact/ui/resolution';
import {useCallback, useContext} from 'react';
import {PanelContext} from './Context';
import LoginPage from './LoginPanel';


import VideoListTab from '../components/VideoListTab';
import VideoUploadPanel from './VideoUploadPanel';
import SearchView from './SearchView'; // SearchView 컴포넌트 추가
import RecentlyViewedVideosPanel from './RecentViewedVideoPanel';
import PlayListPanel from './PlayListPanel';

import css from './VideoListPanel.module.less';
import SystemState from './SystemState';
import {useAuth} from '../auth/AuthProvider'

const videoData = [
	{title: 'Video 1', description: 'Description for video 1', thumbnail: 'https://via.placeholder.com/360x240', duration: '2:30', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
	{title: 'Video 2', description: 'Description for video 2', thumbnail: 'https://via.placeholder.com/360x240', duration: '3:45', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'},
	{title: 'Video 3', description: 'Description for video 3', thumbnail: 'https://via.placeholder.com/360x240', duration: '1:15', src: 'https://example.com/video3.mp4'},
];

const VideoListPanel = props => {
	const {setPanelData} = useContext(PanelContext);
    const { userName } = useAuth(); // 로그인된 사용자 이름 가져오기
	return (
		<Panel {...props} className={css.panel}>
			<Header 
		      title={<span className={css.customTitle}>FOODHUB</span>}
			  subtitle={
        <span className={css.customSubtitle}>
            {userName ? `${userName}님, 무슨 음식을 좋아하시나요?` : '무슨 음식을 좋아하시나요?'}
        </span>
    }
			/>
			<TabLayout>
				<Tab icon="search" title="Search">
					<Scroller>
						<SearchView />
					</Scroller>
				</Tab>
				<Tab icon="home" title="Videos">
					<VideoListTab />
				</Tab>
				<Tab icon="list" title="Recently Viewed">
					<RecentlyViewedVideosPanel />
				</Tab>
				<Tab icon="list" title="Playlists">
					<PlayListPanel />
				</Tab>
				<Tab title="Upload">
					<VideoUploadPanel />
				</Tab>
				<Tab title="Login">
					<LoginPage />
				</Tab>
				<Tab icon="wisa" title="Resource">
					<SystemState></SystemState>
				</Tab>
				
			</TabLayout>
		</Panel>
	);
};

export default VideoListPanel;