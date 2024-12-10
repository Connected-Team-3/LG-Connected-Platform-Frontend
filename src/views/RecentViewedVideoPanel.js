/* eslint-disable enact/prop-types */
import React, {useState, useEffect} from 'react';
import {Header, Panel} from '@enact/sandstone/Panels';
import Item from '@enact/sandstone/Item';
import {PanelContext} from './Context';
import {useCallback, useContext} from 'react';
import Button from '@enact/sandstone/Button';
import Spinner from '@enact/sandstone/Spinner';
import {VirtualList, VirtualGridList} from '@enact/sandstone/VirtualList';
import ImageItem from '@enact/sandstone/ImageItem';
import {Cell, Row} from '@enact/ui/Layout';
import {MediaOverlay} from '@enact/sandstone/MediaOverlay';

import axiosInstance from '../auth/axiosInstance';

const RecentlyViewedVideosPanel = props => {
	const {data, ...rest} = props;
	const index = data?.index ?? 0;
	const {setPanelData} = useContext(PanelContext);
    const [historyData, setHistoryData] = useState([]); // 사용자 기록 상태
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState([]);
    const handleVideoClick = useCallback((video) => {
		setPanelData(prev => [...prev, {name: 'video', data: {index: index + 1, video: video}}]);
	}, [index, setPanelData]);
	// const handleClick = useCallback(() => {
	// 	setPanelData(prev => [...prev, {name: 'setting', data: {index: index + 1}}]);
	// }, [index, setPanelData]);

    const fetchUserHistory = async () => {
        try {
        const response = await axiosInstance.get(`/api/videoHistory/getHistories`);
            setHistoryData(response.data.result.list); // API에서 반환된 데이터로 상태 설정
            console.log(response.data.result.list); // 가져온 기록을 콘솔에 출력
        } catch (error) {
            console.error('Error fetching video data:', error); // 오류 처리
        } finally {
            setLoading(false); // 로딩 상태 비활성화
        }
    };
    
    const fetchVideoDetails = async (videoIds) => {
        try {
            const videoInfoPromises = videoIds.map(async (videoId) => {
            const response = await axiosInstance.get(`/api/video/play/${videoId}`);
            return response.data.result.data; // 비디오 정보를 반환
        });

        // 모든 비디오 정보를 가져올 때까지 기다림
        const videoData = await Promise.all(videoInfoPromises);
        setVideoData(videoData); // 비디오 정보 상태 업데이트
        console.log(videoData); // 비디오 정보 출력
    } catch (error) {
        console.error('Error fetching video details:', error); // 오류 처리
    }
    };
    // 컴포넌트 마운트 시 사용자 기록을 가져옴
    useEffect(() => {
        fetchUserHistory();
        console.log(historyData);
    }, []);

    useEffect(() => {
        if (historyData.length > 0) {
            const videoIds = historyData.map((video) => video.videoId);
            fetchVideoDetails(videoIds); // video_id 배열을 기반으로 비디오 정보를 가져옴
        }
    }, [historyData])

    const renderVideoItem = ({ index }) => {
        const video = videoData[index]; // 비디오 데이터 배열에서 해당 항목 가져오기
    
        if (!video) {
          return null; // 데이터가 없으면 아무 것도 렌더링하지 않음
        }
    
        return (
            <Row wrap>
                {videoData.map((video) => ( 
					<Cell key={video.id} size="auto" onClick={() => handleVideoClick(video)}>
					<MediaOverlay
						marqueeOn="focus"
						muted
						subtitle={video.description}
						textAlign="end"
						title={video.title}
					>
						<source src={video.sourceUrl} />
					</MediaOverlay>
				</Cell>
                ))}
            </Row>
                        
        );
    };

	return (
        <Panel {...rest} style={{backgroundColor: '#FAF0E6' }}>
            <Header> 
                <span
                    style={{
                    color: '#000', // 검은 글씨
                    fontWeight: 'bold', // 두꺼운 글씨
                    fontSize: '45px', // 글씨 크기
                    }}
                >
                최근에 시청한 동영상
                </span>
          </Header>
            {loading ? (
                <Spinner size="small" />
            ) : (
                <Row wrap>
                    {videoData.map((video) => ( 
                        <Cell key={video.id} size="auto" onClick={() => handleVideoClick(video)}>
                        <MediaOverlay
                            marqueeOn="focus"
                            muted
                            subtitle={video.description}
                            textAlign="end"
                            title={video.title}
                        >
                            <source src={video.sourceUrl} />
                        </MediaOverlay>
                    </Cell>
                    ))}
                </Row>
            )}
            {/* 여기서 videoIds를 사용할 수 있습니다 */}
        </Panel>
    );
};

export default RecentlyViewedVideosPanel;
