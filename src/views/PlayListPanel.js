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
import BodyText from '@enact/sandstone/BodyText';

import axiosInstance from '../auth/axiosInstance';

const PlayListPanel = props => {
	const {data, ...rest} = props;
	const index = data?.index ?? 0;
	const {setPanelData} = useContext(PanelContext);
    const [playlist, setPlayList] = useState([]); // 사용자 기록 상태
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState([]);
    const handleVideoClick = useCallback((video, playlist) => {
		setPanelData(prev => [prev.slice(0, -1), {name: 'video', data: {index: index + 1, video: video, playlist:playlist}}]);
	}, [index, setPanelData]);
    
    const fetchVideoDetails = async (videoIds) => {
        try {
            const videoInfoPromises = videoIds.map(async (videoId) => {
            const response = await axiosInstance.get(`/api/video/play/${videoId}`);
            return response.data.result.data; // 비디오 정보를 반환
        });


  // 사용자 플레이리스트를 가져오는 함수
  const fetchPlayList = async () => {
    try {
        setLoading(true);
      const response = await axiosInstance.get(`/api/playlist/getPlaylist`);
      setPlayList(response.data.result.list); // API에서 반환된 데이터로 상태 설정
      console.log(response.data.result.list);

    } catch (error) {
        console.error('Error fetching video details:', error); // 오류 처리
    }
    };
    // 컴포넌트 마운트 시 사용자 기록을 가져옴
    useEffect(() => {
        fetchPlayList();
        console.log(playlist);
    }, []);


  // playlist가 업데이트 될 때마다 video 정보를 가져옴
  useEffect(() => {
    if (playlist.length > 0) {
      const videoIds = playlist.flatMap((playlist) => playlist.videoIdList);
      fetchVideoDetails(videoIds); // 비디오 정보 가져오기
    }
  }, [playlist]); // playlist가 변경될 때마다 비디오 정보 가져오기
    




	return (
        <Panel {...rest} style={{ height: '100%', overflow: 'auto' }}>
    <Header title="플레이리스트" />
    {loading ? (
        <Spinner size="small" />
    ) : playlist.length === 0 ? (
        <BodyText size="large" style={{ marginLeft: '10px', color: 'gray' }}>
            현재 비디오가 없습니다.
        </BodyText>
    ) : (
        <Row wrap>
            {playlist.map((playlist) => (
                <Cell key={playlist.id} size="auto" style={{ marginBottom: '20px', width: '100%' }}>
                    {/* 플레이리스트 제목 표시 */}
                    <BodyText size="large" style={{ marginLeft: '10px' }}>
                        {playlist.title} {/* 플레이리스트 제목 표시 */}
                    </BodyText>

                    {/* 비디오들을 가로로 스크롤 가능한 영역으로 설정 */}
                    <Row
                        wrap={false} // 자동 줄 바꿈 비활성화
                        style={{
                            overflowX: 'auto', // 가로 스크롤 활성화
                            whiteSpace: 'nowrap', // 가로로 아이템이 나열되도록 설정
                            padding: '10px 0' // 약간의 패딩 추가
                        }}
                    >
                        {playlist.videoIdList.map((videoId) => {
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
                </Cell>
            ))}
        </Row>
    )}
</Panel>
    );
};

export default PlayListPanel;
