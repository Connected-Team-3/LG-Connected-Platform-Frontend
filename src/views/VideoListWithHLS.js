import {useState, useMemo, useCallback, useContext, useEffect } from 'react';
import {Item} from '@enact/sandstone/Item';
import {Group} from '@enact/ui/Group';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {Scroller} from '@enact/sandstone/Scroller';
import {MediaOverlay} from '@enact/sandstone/MediaOverlay';
import {scaleToRem} from '@enact/ui/resolution';
import {PanelContext} from '../views/Context';
import {Row, Cell} from '@enact/ui/Layout';
import axiosInstance from '../auth/axiosInstance';
import Spinner from '@enact/sandstone/Spinner';
import Dropdown from '@enact/sandstone/Dropdown';
import { Panel } from '@enact/sandstone/Panels';
import ImageItem from '@enact/sandstone/ImageItem';


import React from 'react';
import HeaderMessage from '../views/HeaderMessage';


const ids = [3, 5, 6, 7, 8];


const VideoListWithHLS = props => {
	const {data, userName,logo, ...rest} = props;
	const index = data?.index ?? 0;
	const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);
	const {setPanelData} = useContext(PanelContext);
	const handleVideoClick = useCallback((video) => {
        setPanelData(prev => {
            const updatedData = [...prev, { name: 'hls', data: { index: index + 1, videoId: video.id } }];
            console.log('Panel stack after video click:', updatedData); // 변경된 패널 스택을 로그로 출력
            return updatedData;
        });
    }, [index, setPanelData]);

    const fetchVideoDetails = async (videoIds) => {
        try {
          const videoInfoPromises = videoIds.map(async (videoId) => {
            const response = await axiosInstance.get(`/api/video/play/${videoId}`);
            
            // Ensure response and response.data are valid before accessing 'data'
            if (response && response.data && response.data.result) {
              return response.data.result.data; // 비디오 정보를 반환
            } else {
              console.error(`Error: Video details not found for videoId ${videoId}`);
              return null; // 비디오가 없으면 null 반환
            }
          });
    
          // 모든 비디오 정보를 가져올 때까지 기다림
          const videoData = await Promise.all(videoInfoPromises);
          // 필터링하여 null 값을 제외한 valid videoData만 설정
          setVideoData(videoData.filter((video) => video !== null));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching video details:', error); // 오류 처리
        }
      };


	useEffect(() => {
        fetchVideoDetails(ids);
    }, []);

	if (loading) {
        return <Spinner />
    }

	

	return (
		<Panel {...rest} style={{ height: '100%', overflow: 'auto', backgroundColor: '#FAF0E6' }}>
            {/* HeaderMessage 추가 */}

            <Row wrap
            >
                {videoData.map((video) => {
                    if (!video) return null; // 비디오가 없으면 렌더링하지 않음

                    return (
                        <Cell key={video.id} style={{ width: '150px', height: '250px', marginRight: '10px' }} onClick={() => handleVideoClick(video)}>
                            <ImageItem
                                src={video.thumbUrl} // 썸네일 이미지
                                //label={video.description}  // 비디오 설명
                                orientation="horizontal"
                            >
                                {/* {video.title} */}
                                {<span style={{ color: '#000' }}>{video.title}</span>}
                            </ImageItem>
                        </Cell>
                    );
                })}
            </Row>
		</Panel>
    );
};

export default VideoListWithHLS;