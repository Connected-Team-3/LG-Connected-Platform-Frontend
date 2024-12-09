import React, {useCallback, useState, useEffect, useRef, useContext} from 'react';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import Spinner from '@enact/sandstone/Spinner';
import Button from '@enact/sandstone/Button';
import { Panel } from '@enact/sandstone/Panels';
import {PanelContext} from './Context';
import axiosInstance from '../auth/axiosInstance';
import Cookies from 'js-cookie';
import Popup from '@enact/sandstone/Popup';
import BodyText from '@enact/ui/BodyText';
import {Cell, Row} from '@enact/ui/Layout';
import ImageItem from '@enact/sandstone/ImageItem';

const Video = props => {
	const {data, ...rest} = props;
	const index = data?.index ?? 0;
	const playlist = data?.playlist ?? null;
	const videoIdList = playlist?.videoIdList ?? null;
	const [videoTimeStamp, setVideoTimeStamp] = useState(0);
	const [videoData, setVideoData] = useState([]);
	const {setPanelData} = useContext(PanelContext);
	const [lastVideoTimeStamp, setLastVideoTimeStamp] = useState(0);
	const [lastWatchedAt, setLastWatchedAt] = useState(null);
	const [lastHistoryUpdate, setLastHistoryUpdate] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isPopupOpen, setPopupOpen] = useState(false);
	const handleVideoClick = useCallback((video, playlist) => {
		setPanelData(prev => [...prev, { name: 'video', data: { index: index+1, video: video, playlist: playlist } }, // 새로운 비디오 정보를 추가
		  ]);
	}, [index, setPanelData]);

	console.log(playlist);

	const videoRef = useRef(null);

	const fetchVideoDetails = async (videoId) => {
		try {
			const response = await axiosInstance.get(`/api/video/play/${videoId}`);
			return response.data.result.data;
		} catch (error) {
			console.error('Error fetching video details:', error); // 오류 처리
		}
	};

	const fetchAllVideoDetails = async (videoIds) => {
        try {
            const videoInfoPromises = videoIds.map(async (videoId) => {
            const response = await axiosInstance.get(`/api/video/play/${videoId}`);
            return response.data.result.data; // 비디오 정보를 반환
        });

        // 모든 비디오 정보를 가져올 때까지 기다림
        const videoData = await Promise.all(videoInfoPromises);
        setVideoData(videoData); // 비디오 정보 상태 업데이트
		console.log("fetch playlist videos")
        console.log(videoData); // 비디오 정보 출력
    } catch (error) {
        console.error('Error fetching video details:', error); // 오류 처리
    }
    };

	const fetchVideoHistory = async () => {
		try {
		  const videoId = data.video.id;
		  const response = await axiosInstance.get(`/api/videoHistory/getHistoryByVideo/${videoId}`);
		console.log(response.data);
		  if (response.data.success) {
			const videoHistory = response.data.result.data;
			console.log('Fetched video history:', videoHistory);

			// Check if history exists, and if so, set the video timestamp
			if (videoHistory) {
			  setLastVideoTimeStamp(videoHistory.videoTimeStamp); // Set the last watched timestamp
			  setLastWatchedAt(videoHistory.lastWatchedAt); // Set the last watched time
			}
		  } else {
			console.log('No video history found.');
			setLastHistoryUpdate(0);
		  }
		} catch (error) {
		  console.error('Error fetching video history:', error);
		}
	  };

	const logVideoHistory = async (currentState) => {
		try {
		  const videoId = data.video.id;
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
	  const handlePlaylistView = () => {
		if (playlist)
			setPopupOpen(true);  // Popup 열기
	  };
	
	  const handlePopupClose = () => {
		setPopupOpen(false);  // Popup 닫기
	  };

	  const handleNextVideo = async () => {
		if (videoIdList) {
		const videoId = data.video.id;
		const videoIdList = data.playlist.videoIdList;
		  const currentIndex = videoIdList.findIndex(id => id === videoId);
		  const nextIndex = (currentIndex + 1) % videoIdList.length; // 다음 비디오 인덱스를 계산
	  
		  // 비동기 함수에서 비디오 정보를 가져옴
		  const nextVideoData = await fetchVideoDetails(videoIdList[nextIndex]); // nextIndex를 사용하여 비디오 정보를 가져옵니다.
		  console.log(nextVideoData);
		
		  // panelData 업데이트 (nextVideoData를 사용)
		  setPanelData(prev => [...prev,
			{ name: 'video', data: { index: index+1, video: nextVideoData, playlist: playlist } }, // 새로운 비디오 정보를 추가
		 ] );
		}
	  };
	  

	  const handlePreviousVideo = async () => {
		if (videoIdList) {
			const videoId = data.video.id;
			const videoIdList = data.playlist.videoIdList;
		  const currentIndex = videoIdList.findIndex(id => id === videoId);

		  // 비동기 함수에서 비디오 정보를 가져옴
		  const previousIndex = (currentIndex - 1 + videoIdList.length) % videoIdList.length;

			// 비동기 함수에서 비디오 정보를 가져옴
			const previousVideoData = await fetchVideoDetails(videoIdList[previousIndex]); // previousIndex를 사용하여 비디오 정보를 가져옵니다.

			// panelData 업데이트 (previousVideoData를 사용)
			setPanelData(prev =>  [...prev,
			{ name: 'video', data: { index: index+1, video: previousVideoData, playlist: playlist } }, // 새로운 비디오 정보를 추가
			]);
		}
	  };


	
	  useEffect(() => {
		// 처음 한 번만 fetchVideoHistory 실행
		fetchVideoHistory();
	
		const intervalId = setInterval(() => {
		  handleMediaStateUpdate();
		}, 1000); // Check every 1 second (you can adjust this interval as needed)

		if (videoIdList && videoIdList.length > 0) {
			// 각 플레이리스트의 videoIdList 배열을 기반으로 비디오 정보 가져오기
			fetchAllVideoDetails(playlist.videoIdList); // 비디오 정보 가져오기
		  }
	
		// Cleanup the interval when the component unmounts
		return () => clearInterval(intervalId);
	  }, []);

	  useEffect(() => {
		const videoElement = videoRef.current?.getVideoNode();
		console.log("last watched", lastVideoTimeStamp);
		if (videoElement && lastVideoTimeStamp > 0) {
		  videoElement.currentTime = lastVideoTimeStamp; // Seek to the last watched timestamp
		}
		setIsLoading(false);
	  }, [lastVideoTimeStamp]);
	

	return (
		<Panel>
      {isLoading ? (
        <Spinner size="small" />
      ) : (
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
          <infoComponents>{data.video.title}</infoComponents>
          <MediaControls
            jumpBackwardIcon="jumpbackward"
            jumpForwardIcon="jumpforward"
            pauseIcon="pause"
            playIcon="play"
          >
            <Button
				icon="backward"
				size="small"
				onClick={handlePreviousVideo}
			>
			</Button>

			{/* 다음 동영상 버튼 */}
			<Button
				icon="forward"
				size="small"
				onClick={handleNextVideo}
			>
			</Button>

			{/* 플레이리스트 목록 보기 버튼 */}
			<Button
				icon="list"
				size="small"
				onClick={handlePlaylistView}
			>
			</Button>
          </MediaControls>
        </VideoPlayer>
	  )}
	  <Popup open={isPopupOpen} onClose={handlePopupClose}>
        <BodyText size="large" style={{ marginLeft: '10px' }}>
          {playlist ? playlist.title : ""} {/* 플레이리스트 제목 표시 */}
        </BodyText>

        {/* 가로로 스크롤 가능한 비디오 목록 */}
		{videoIdList && (
        <Row
			wrap={false} // 자동 줄 바꿈 비활성화
			style={{
				overflowX: 'auto', // 가로 스크롤 활성화
				whiteSpace: 'nowrap', // 가로로 아이템이 나열되도록 설정
				padding: '10px 0' // 약간의 패딩 추가
			}}
		>
			{videoIdList.map((videoId) => {
				const video = videoData.find((v) => v.id === videoId); // 비디오 ID에 해당하는 비디오 찾기
				if (!video) return null; // 비디오가 없으면 렌더링하지 않음

				return (
					<Cell key={video.id} style={{ width: '150px', height: '250px', marginRight: '10px' }} onClick={() => handleVideoClick(video, playlist)}>
						<ImageItem
							src={video.thumbUrl} // 썸네일 이미지
							label={video.description}  // 비디오 설명
							orientation="horizontal"
						>
							{video.title}
						</ImageItem>
					</Cell>
				);
			})}
		</Row>
		)}
      </Popup>
    </Panel>
	);
};

export default Video;
