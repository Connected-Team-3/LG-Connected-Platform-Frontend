import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

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
import SystemState from './SystemState'; // yongug systemstate 
import PlaylistItem from './PlaylistItem'; // yongug playlist item
import {getPlaylists} from '../api/playlist'; // yongug playlist call
import { getVideoById } from '../api/video';


const videoData = [
	{title: 'Video 1', description: 'Description for video 1', thumbnail: 'https://via.placeholder.com/360x240', duration: '2:30', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
	{title: 'Video 2', description: 'Description for video 2', thumbnail: 'https://via.placeholder.com/360x240', duration: '3:45', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'},
	{title: 'Video 3', description: 'Description for video 3', thumbnail: 'https://via.placeholder.com/360x240', duration: '1:15', src: 'https://example.com/video3.mp4'},
];

const VideoListPanel = props => {
	const {setPanelData} = useContext(PanelContext);
	const [playlists, setPlaylists] = useState([]);
	const navigate = useNavigate();

	// Fetch playlists for userId
	const fetchPlaylists = async () => {
		try {
			let userId = 1;
			const response = await getPlaylists(userId); // API 호출
			console.log('Fetched playlists:', response);

			if (response && Array.isArray(response) && response.length > 0) {
				setPlaylists(response);
			} else {
				console.warn('No playlists fetched or data format is invalid:', response);
			}
		} catch (error) {
			console.error('Error fetching playlists:', error);
		}
	};

	useEffect(() => {
        fetchPlaylists();
    }, []);

	// Fetch video data for a playlist
	const fetchVideosForPlaylist = async (videoIdList) => {
		console.log('Starting fetch for videoIdList:', videoIdList);
	
		try {
			const videoPromises = videoIdList.map(async (videoId) => {
				const response = await getVideoById(videoId);
				console.log(`Response for video ID ${videoId}:`, response);
				return response;
			});
	
			const videoResponses = await Promise.all(videoPromises);
			console.log('All video responses:', videoResponses);
	
			const videos = videoResponses
				.map((res) => res?.result?.data || null)
				.filter((video) => video != null);
	
			console.log('Filtered valid videos:', videos);
			return videos;
		} catch (error) {
			console.error('Error during fetchVideosForPlaylist:', error);
			return [];
		}
	};
	
		

	// Handle playlist click
	const handlePlaylistClick = async (playlist) => {
		console.log('Clicked playlist:', playlist);
	
		if (playlist && playlist.videoIdList && playlist.videoIdList.length > 0) {
			try {
				const videos = await fetchVideosForPlaylist(playlist.videoIdList);
	
				if (videos.length > 0) {
					console.log('Navigating to playlist page with videos:', videos);
					navigate('/playlist', { state: { playlist, videos } });
				} else {
					console.warn('No videos found for this playlist:', playlist);
				}
			} catch (error) {
				console.error('Error handling playlist click:', error);
			}
		} else {
			console.warn('Invalid playlist or missing videos:', playlist);
		}
	};
	

	return (
		<Panel {...props}>
			<Header title="Video Collection" subtitle="Explore and Play Videos" />
			<TabLayout>
				<Tab title="Videos">
					<VideoListTab />
				</Tab>
				<Tab title="Recently Viewed">
					<Scroller>

					</Scroller>
				</Tab>
				<Tab title="Playlists">
					<Scroller>
						{/* Playlists tab content */}
                        {playlists.length > 0 ? (
                            playlists.map((playlist) => (
                                <PlaylistItem
                                    key={playlist.id}
                                    playlist={playlist}
                                    onClick={() => handlePlaylistClick(playlist)}
                                />
                            ))
                        ) : (
                            <p>No playlists available.</p>
                        )}
					</Scroller>
				</Tab>
				<Tab title="Upload">
					<VideoUploadPanel />
				</Tab>
				<Tab title="Login">
					<LoginPage />
				</Tab>
				{/* yongug */}
				<Tab title="System">
					<SystemState />
				</Tab>
			</TabLayout>
		</Panel>
	);
};

export default VideoListPanel;
