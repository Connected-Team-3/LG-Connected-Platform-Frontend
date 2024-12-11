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
import CartPanel from './CartPanel';
import HLSVideo from './HLSVideo';
import AlarmPanel from './AlarmPanel';

import logo from './logo.png';

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
			{/* <div className={css.layoutContainer}> */}
    {/* 로고와 사용자 메시지 */}
    {/* <div className={css.headerContainer}>
        <img src={logo} alt="Logo" className={css.logo} />
        <div className={css.message}>
            {userName ? (
                <span>{`${userName}님, 무슨 음식을 좋아하시나요?`}</span>
            ) : (
                <span>무슨 음식을 좋아하시나요?</span>
            )}
        </div>
    </div> */}
			<TabLayout>
				{/* <div icon='home' title='home'>
				<Header 
		      title={
			  <div>
			  <img src="./logo.png" alt="Logo" className={css.logo} />
			  <span className={css.customTitle}>FOODHUB</span>
			  </div>
			  }
			  subtitle={
				<span className={css.customSubtitle}>
				{userName ? `${userName}님, 무슨 음식을 좋아하시나요?` : '무슨 음식을 좋아하시나요?'}
				</span>
				} 
			  className={css.header}
			  titleClassName = {css.title}
			  slotAfter={
                    <IconItem onClick={handleLogoutAndBack} aria-label="Logout">
                        <Icon>logout</Icon>
                    </IconItem>
                }
      		/>
				</div> */}
				
				<Tab icon='home' title="Home">
					<VideoListTab/>
				</Tab>
				<Tab icon='search' title="Search">
					<Scroller>
						<SearchView />
					</Scroller>
				</Tab>
				<Tab icon='timer' title="Recently Viewed">
					<RecentlyViewedVideosPanel />
				</Tab>
				<Tab icon='list' title="Playlists">
					<PlayListPanel />
				</Tab>
				<Tab icon='seemore' title="Streaming">
					<HLSVideo />
				</Tab>
          <Tab icon='shopping' title="Cart">
            <CartPanel />
				</Tab>
				<Tab title="Update Profile">
					<UpdateProfile />
				</Tab>
				<Tab title="Timer">
					<AlarmPanel />
				</Tab>
				<Tab icon='wisa' title="Resource">
					<SystemState></SystemState>
				</Tab>
				</TabLayout>
				{/* </div> */}
		</Panel>
	);
};

export default VideoListPanel;