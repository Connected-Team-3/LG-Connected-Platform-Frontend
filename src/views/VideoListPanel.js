import MediaOverlay from '@enact/sandstone/MediaOverlay';
import Scroller from '@enact/sandstone/Scroller';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {Header, Panel} from '@enact/sandstone/Panels';
import {scaleToRem} from '@enact/ui/resolution';
import {useCallback, useContext} from 'react';
import {PanelContext} from './Context';
import LoginPage from './LoginPanel';

import SearchComponent from '../components/SearchComponent';
import SearchResults from '../components/SearchResults';
import { Button } from '@enact/sandstone/Button'; // Button 컴포넌트 추가
import SearchView from './SearchView'; // SearchView 컴포넌트 추가


import VideoListTab from '../components/VideoListTab';
import VideoUploadPanel from './VideoUploadPanel';


const videoData = [
	{title: 'Video 1', description: 'Description for video 1', thumbnail: 'https://via.placeholder.com/360x240', duration: '2:30', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
	{title: 'Video 2', description: 'Description for video 2', thumbnail: 'https://via.placeholder.com/360x240', duration: '3:45', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'},
	{title: 'Video 3', description: 'Description for video 3', thumbnail: 'https://via.placeholder.com/360x240', duration: '1:15', src: 'https://example.com/video3.mp4'},
];

const VideoListPanel = props => {
	const {setPanelData} = useContext(PanelContext);
	// 검색 버튼 클릭 시 호출되는 핸들러
	const handleSearchClick = () => {
		console.log(SearchView);
		setPanelData(prev => [...prev, { name: 'search', data: {} }]); // 검색 패널로 이동
	};

	return (
		<Panel {...props}>
			<Header title="Video Collection" subtitle="Explore and Play Videos" />

			<TabLayout>
				<Tab title="Search">
						<SearchView />
				</Tab>
				<Tab title="Videos">
					<VideoListTab />
				</Tab>
				<Tab title="Recently Viewed">
					<Scroller>

					</Scroller>
				</Tab>
				<Tab title="Playlists">
					<Scroller>

					</Scroller>
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
