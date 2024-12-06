import React, {useCallback, useState, useEffect, useRef} from 'react';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import Button from '@enact/sandstone/Button';
import { Panel } from '@enact/sandstone/Panels';
import {PanelContext} from './Context';
import axiosInstance from '../auth/axiosInstance';
import Cookies from 'js-cookie';

const Video = props => {
	const {data, ...rest} = props;
	const index = data?.index ?? 0;
	const [videoTimeStamp, setVideoTimeStamp] = useState(0);
	const [lastWatchedAt, setLastWatchedAt] = useState(null);
	const [lastHistoryUpdate, setLastHistoryUpdate] = useState(null);

	const videoRef = useRef(null);

	const fetchVideoHistory = async () => {
		try {
		  const videoId = data.video.id;
		  const response = await axiosInstance.get(`/api/videoHistory/getHistoryByVideo/${videoId}`);
		console.log(response.data);
		  if (response.data.success) {
			const videoHistory = response.data.result.data;
			console.log('Fetched video history:', videoHistory);
	
			// Check if history exists, and if so, set the video timestamp
			if (videoHistory && videoHistory.videoTimeStamp) {
			  const { videoTimeStamp } = videoHistory.videoTimeStamp;
			  setVideoTimeStamp(videoTimeStamp); // Set the last watched timestamp
			  setLastWatchedAt(videoHistory.lastWatchedAt); // Set the last watched time
			}
		  } else {
			console.log('No video history found.');
		  }
		} catch (error) {
		  console.error('Error fetching video history:', error);
		}
	  };

	const logVideoHistory = async (currentState) => {
		try {
		  const videoId = data.video.id;
		  console.log(currentState.currentTime)
		  const response = await axiosInstance.post('/api/videoHistory/create', {
			videoId,
			videoTimeStamp: currentState.currentTime,
		  });
	
		  if (response.status === 200) {
			console.log('Video watch history saved successfully');
		  } else {
			console.log('Failed to save video watch history');
		  }
		} catch (error) {
		  console.error('Error logging video history:', error);
		}
	  };


	
	  // Handle video state update
	  const handleMediaStateUpdate = () => {
		if (videoRef.current) {
		  // Get the current media state
		  const mediaState = videoRef.current.getMediaState();

		  if (!mediaState.paused && mediaState.currentTime !== videoTimeStamp) {
			const currentTime = mediaState.currentTime;
			const now = new Date().toISOString();
	
			// 요청이 일정 시간 간격으로만 보내지도록 설정
			if (!lastHistoryUpdate || (new Date() - new Date(lastHistoryUpdate)) > 1000) { // 예: 10초 간격
			  setVideoTimeStamp(currentTime);
			  setLastWatchedAt(now);
			  setLastHistoryUpdate(now); // 마지막 요청 시간을 기록
	
			  // Log the video history
			  logVideoHistory(mediaState);
			}
		  }
		  
		}
	  };
	
	  useEffect(() => {
		// 처음 한 번만 fetchVideoHistory 실행
		fetchVideoHistory();
	
		const intervalId = setInterval(() => {
		  handleMediaStateUpdate();
		}, 1000); // Check every 1 second (you can adjust this interval as needed)
	
		// Cleanup the interval when the component unmounts
		return () => clearInterval(intervalId);
	  }, []);

	  useEffect(() => {
		const videoElement = videoRef.current?.getVideoNode();
		if (videoElement && videoTimeStamp > 0) {
		  videoElement.currentTime = videoTimeStamp; // Seek to the last watched timestamp
		}
	  }, [videoTimeStamp]);
	

	return (
		<Panel>
		<VideoPlayer
			ref={videoRef}
			autoCloseTimeout={7000}
			backButtonAriaLabel={null}
			feedbackHideDelay={3000}
			initialJumpDelay={400}
			jumpDelay={200}
			loop
			miniFeedbackHideDelay={2000}
			muted
			title={data.title}
			titleHideDelay={4000}
		>
			<source src={data.video.sourceUrl} type="video/mp4" />
			<infoComponents>{data.video.description}</infoComponents>
			<MediaControls
				jumpBackwardIcon="jumpbackward"
				jumpForwardIcon="jumpforward"
				pauseIcon="pause"
				playIcon="play"
			>
				<Button icon="list" size="small" />
				<Button icon="playspeed" size="small" />
				<Button icon="speakercenter" size="small" />
				<Button icon="miniplayer" size="small" />
				<Button icon="subtitle" size="small" />
			</MediaControls>
		</VideoPlayer>
		</Panel>
	);
};

export default Video;
