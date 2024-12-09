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


import VideoListTab from '../components/VideoListTab';
import VideoUploadPanel from './VideoUploadPanel';
import SearchView from './SearchView'; // SearchView 컴포넌트 추가
import RecentlyViewedVideosPanel from './RecentViewedVideoPanel';
import PlayListPanel from './PlayListPanel';

import css from './VideoListPanel.module.less';


const VideoListPanel = props => {
	const {setPanelData} = useContext(PanelContext);

	return (
		<Panel {...props} className={css.panel}>
			<Header className={css.header} class="header">
				<slotBefore><Button /></slotBefore>
					<title>My Title</title>
				</Header>
			<TabLayout className={css.tabLayout}>
				<Tab title="Search" className={css.tab}>
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
			</TabLayout>
		</Panel>
	);
};

export default VideoListPanel;
