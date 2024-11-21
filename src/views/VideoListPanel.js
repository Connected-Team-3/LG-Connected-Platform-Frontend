import MediaOverlay from '@enact/sandstone/MediaOverlay';
import Scroller from '@enact/sandstone/Scroller';
import TabLayout, {Tab} from '@enact/sandstone/TabLayout';
import {Header, Panel} from '@enact/sandstone/Panels';
import {scaleToRem} from '@enact/ui/resolution';
import {useCallback, useContext} from 'react';
import {PanelContext} from './Context';

const videoData = [
	{title: 'Video 1', description: 'Description for video 1', thumbnail: 'https://via.placeholder.com/360x240', duration: '2:30', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
	{title: 'Video 2', description: 'Description for video 2', thumbnail: 'https://via.placeholder.com/360x240', duration: '3:45', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'},
	{title: 'Video 3', description: 'Description for video 3', thumbnail: 'https://via.placeholder.com/360x240', duration: '1:15', src: 'https://example.com/video3.mp4'},
];

const VideoListPanel = props => {
	const {setPanelData} = useContext(PanelContext);

	const handleVideoClick = useCallback(
		video => () => {
			setPanelData(prev => [...prev, {name: 'video', data: video}]);
		},
		[setPanelData]
	);

	const videoItems = videoData.map((video, index) => (
		<MediaOverlay
			key={`video-${index}`}
			thumbnailSrc={video.thumbnail}
			title={video.title}
			subtitle={video.description}
			duration={video.duration}
			style={{
				width: scaleToRem(768),
				height: scaleToRem(588),
				marginBottom: scaleToRem(24)
			}}
			onClick={handleVideoClick(video)}
		/>
	));

	return (
		<Panel {...props}>
			<Header title="Video Collection" subtitle="Explore and Play Videos" />
			<TabLayout>
				<Tab title="Videos">
					<Scroller>{videoItems}</Scroller>
				</Tab>
				<Tab title="About">
					<p style={{padding: scaleToRem(24)}}>
						Welcome to the video collection. Click on any video to view its details or play it.
					</p>
				</Tab>
			</TabLayout>
		</Panel>
	);
};

export default VideoListPanel;
