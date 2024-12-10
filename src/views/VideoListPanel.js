import MediaOverlay from '@enact/sandstone/MediaOverlay';
import Scroller from '@enact/sandstone/Scroller';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {Header, Panel} from '@enact/sandstone/Panels';
import {scaleToRem} from '@enact/ui/resolution';
import {useCallback, useContext} from 'react';
import {PanelContext} from './Context';
import LoginPage from './LoginPanel';
import Button from '@enact/sandstone/Button';
import SlotItem from '@enact/ui/SlotItem';
import VideoExample from '../components/VideoExample';


import VideoListTab from '../components/VideoListTab';
import VideoUploadPanel from './VideoUploadPanel';
import SearchView from './SearchView'; // SearchView 컴포넌트 추가
import RecentlyViewedVideosPanel from './RecentViewedVideoPanel';
import PlayListPanel from './PlayListPanel';

import css from './VideoListPanel.module.less';
import SystemState from './SystemState';
import {useAuth} from '../auth/AuthProvider'


const VideoListPanel = props => {
	const {setPanelData} = useContext(PanelContext);
    const { userName } = useAuth(); // 로그인된 사용자 이름 가져오기
	return (
		<Panel {...props} className={css.panel}>
			<Header 
		      title="FOODHUB" 
			  subtitle={userName ? `${userName}님, 무슨 음식을 좋아하시나요?` : '무슨 음식을 좋아하시나요?'} 
			  className={css.header}
      		/>
			<TabLayout>
				<Tab title="Search">
					<Scroller>
						<SearchView />
					</Scroller>
				</Tab>
				<Tab title="Videos">
					<VideoListTab />
				</Tab>
				<Tab title="Recently Viewed">
					<RecentlyViewedVideosPanel />
				</Tab>
				<Tab title="Playlists">
					<PlayListPanel />
				</Tab>
				<Tab title="Upload">
					<VideoUploadPanel />
				</Tab>
				<Tab title="Login">
					<LoginPage />
				</Tab>
				<Tab title="Resource">
					<SystemState></SystemState>
				</Tab>
				
			</TabLayout>
		</Panel>
	);
};

export default VideoListPanel;