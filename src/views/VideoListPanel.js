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
<<<<<<< HEAD
import SearchView from './SearchView'; // SearchView 컴포넌트 추가
=======
import RecentlyViewedVideosPanel from './RecentViewedVideoPanel';
import PlayListPanel from './PlayListPanel';
>>>>>>> 435fb5ebc473546a59fc0b9150a6c57d2da31ef3

const videoData = [
	{title: 'Video 1', description: 'Description for video 1', thumbnail: 'https://via.placeholder.com/360x240', duration: '2:30', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
	{title: 'Video 2', description: 'Description for video 2', thumbnail: 'https://via.placeholder.com/360x240', duration: '3:45', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'},
	{title: 'Video 3', description: 'Description for video 3', thumbnail: 'https://via.placeholder.com/360x240', duration: '1:15', src: 'https://example.com/video3.mp4'},
];

const VideoListPanel = props => {
	const {setPanelData} = useContext(PanelContext);

	return (
<<<<<<< HEAD
		<Panel style={{ height: '100%', overflow: 'auto' }}>
			<Header title="Video Collection" subtitle="Explore and Play Videos" />
			<TabLayout>
				<Tab title="Search">
					<Scroller>
						<SearchView />
					</Scroller>
				</Tab>
=======
		<Panel {...props}>
			<Header title="Video Collection" subtitle="Explore and Play Videos" />
			<TabLayout>
>>>>>>> 435fb5ebc473546a59fc0b9150a6c57d2da31ef3
				<Tab title="Videos">
					<VideoListTab />
				</Tab>
				<Tab title="Recently Viewed">
<<<<<<< HEAD
					<Scroller>

					</Scroller>
				</Tab>
				<Tab title="Playlists">
					<Scroller>

					</Scroller>
=======
					<RecentlyViewedVideosPanel />
				</Tab>
				<Tab title="Playlists">
					<PlayListPanel />
>>>>>>> 435fb5ebc473546a59fc0b9150a6c57d2da31ef3
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
