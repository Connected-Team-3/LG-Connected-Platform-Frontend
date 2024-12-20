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
import ProfilePanel from './ProfilePanel';

	import css from './VideoListPanel.module.less';
	import SystemState from './SystemState';
	import {useAuth} from '../auth/AuthProvider'
	import CartPanel from './CartPanel';
	import HLSVideo from './HLSVideo';
	import AlarmPanel from './AlarmPanel';
	import Profile from './ProfilePanel'
	import logo from './logo.png';
import VideoListWithHLS from './VideoListWithHLS'
import React from 'react';
import HeaderMessage from './HeaderMessage';

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
				slotBefore={<img src={logo} alt="Logo" className={css.logo} />}
		      title="오늘 뭐 먹지?" 
			  subtitle={userName ? `${userName}님, 무슨 음식을 좋아하시나요?` : '무슨 음식을 좋아하시나요?'} 
			  className={css.header}
			  style={{ margin: 0, padding: 0 }} // 인라인 스타일
			  slotAfter={
                    <IconItem onClick={handleLogoutAndBack} aria-label="Logout">
                        <Icon>logout</Icon>
                    </IconItem>
                }
      		/>
						
	
				<TabLayout
					style={{
        			height: 'calc(100vh - 100px)', // 화면 높이에서 Header 높이를 뺀 값
        			overflow: 'hidden', // 불필요한 스크롤 방지
    				}}	
				>
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
		


					
					<Tab icon="home" title='Home'
					>
						<VideoListTab userName={userName} logo={logo} />
					</Tab>
					<Tab icon='search' title="Search">
						<Scroller>
							<SearchView />
						</Scroller>
					</Tab>
					<Tab icon='timer' title="Recently Viewed">
					    <Scroller>
						<RecentlyViewedVideosPanel />
						</Scroller>
					</Tab>
					<Tab icon='list' title="Playlists">
					<Scroller>
						<PlayListPanel />
						</Scroller>
					</Tab>
					<Tab icon='seemore' title="Streaming">
					<Scroller>
						<VideoListWithHLS />
						</Scroller>
					</Tab>
					<Tab icon='shopping' title="Cart">
					<Scroller>
						<CartPanel />
						</Scroller>
					</Tab>
					<Tab icon='profile' title="Profile">
					<Scroller>
						<Profile />
						</Scroller>
					</Tab>
					{/* <Tab title="Timer">
						<AlarmPanel />
					</Tab> */}
					<Tab icon='wisa' title="Resource">
					<Scroller>
						<SystemState></SystemState>
						</Scroller>
					</Tab>
					</TabLayout>
					{/* </div> */}
			</Panel>
		);
	};

	export default VideoListPanel;