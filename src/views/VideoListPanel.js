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

	import logo from './logo.png';

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
		title={
						<div style={{ alignItems:'flex-start', justifyContent: 'flex-start', padding: '0', margin: '0',height:'100%' }}
						>
							<img src={logo} alt="Logo" className={css.logo} />
					<span
				className={css.customTitle}
				style={{ marginRight: '10px', padding: '0', margin: '0' }}
			>
				FOODHUB 
			</span>
			<span
				className={css.customSubtitle}
				style={{  marginRight: '10px', padding: '0', margin: '0' }}
			>
				{userName ? ` ${userName}님, 무슨 음식을 좋아하시나요?` : '무슨 음식을 좋아하시나요?'}
			</span>
		</div>

		}
					className={css.header}
					style={{
						margin: '0',
						padding:'0',
			height: '100px', // Header의 세로 높이를 줄임
			
			backgroundColor: 'rgba(165, 0, 52, 1)', // 배경 색상 유지
		}}
		ClassName={css.title}
		slotAfter={
			<IconItem onClick={handleLogoutAndBack} aria-label="Logout">
				<Icon>logout</Icon>
			</IconItem>
		}
	/>

		

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
				<Tab title="Profile">
					<ProfilePanel />
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