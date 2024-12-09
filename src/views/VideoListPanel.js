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

import Icon from '@enact/sandstone/Icon'
import IconItem from '@enact/sandstone/IconItem';

import VideoListTab from '../components/VideoListTab';
import VideoUploadPanel from './VideoUploadPanel';
import SearchView from './SearchView'; 
import RecentlyViewedVideosPanel from './RecentViewedVideoPanel';
import PlayListPanel from './PlayListPanel';
import UpdateProfile from './UpdateProfile';

import css from './VideoListPanel.module.less';
import SystemState from './SystemState';
import {useAuth} from '../auth/AuthProvider'



const VideoListPanel = props => {
	const { data, ...rest } = props;
	const {setPanelData} = useContext(PanelContext);
    const { userName } = useAuth(); // 로그인된 사용자 이름 가져오기
	const index = data?.index ?? 0;
	const { logout } = useAuth(); // 로그인 함수 가져오기
	const handleLogoutAndBack = useCallback(() => {
		try {
		  // 로그아웃 API 호출
		  logout();
	
		  // 뒤로 가기 (panelIndex 하나 빼기)
		  if (index > 0) {
			setPanelData(prev => prev.slice(0, -1));
		  }
		} catch (error) {
		  console.error('로그아웃 실패:', error);
		}
	  }, [logout, index, setPanelData]);

	return (
		<Panel {...props} className={css.panel} noBackButton={true}>
			<Header 
		      title="FOODHUB" 
			  subtitle={userName ? `${userName}님, 무슨 음식을 좋아하시나요?` : '무슨 음식을 좋아하시나요?'} 
			  className={css.header}
			  slotAfter={
                    <IconItem onClick={handleLogoutAndBack} aria-label="Logout">
                        <Icon>logout</Icon>
                    </IconItem>
                }
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
				<Tab title="Update Profile">
					<UpdateProfile />
				</Tab>
				<Tab title="Resource">
					<SystemState></SystemState>
				</Tab>
			</TabLayout>
		</Panel>
	);
};

export default VideoListPanel;