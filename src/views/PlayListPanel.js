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

import css from './PlayListPanel.module.less';

const PlayListPanel = props => {
   const {data, ...rest} = props;
   const index = data?.index ?? 0;
   const {setPanelData} = useContext(PanelContext);
    const [playlist, setPlayList] = useState([]); // 사용자 기록 상태
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState([]);
    const handleVideoClick = useCallback((video, playlist) => {
		setPanelData(prev => [...prev, {name: 'video', data: {index: index + 1, video: video, playlist:playlist}}]);
	}, [index, setPanelData]);

    
   // 비디오 데이터를 가져오는 함수
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
    } catch (error) {
      console.error('Error fetching video details:', error); // 오류 처리
    }
  };
  // 사용자 플레이리스트를 가져오는 함수
  const fetchPlayList = async () => {
    try {
        setLoading(true);
      const response = await axiosInstance.get(`/api/playlist/getPlaylist`);
      setPlayList(response.data.result.list); // API에서 반환된 데이터로 상태 설정
      console.log(response.data.result.list);
    } catch (error) {
        console.error('Error fetching video details:', error); // 오류 처리
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 사용자 기록을 가져옴
  useEffect(() => {
    fetchPlayList();
  }, []);

  // playlist가 업데이트 될 때마다 video 정보를 가져옴
  useEffect(() => {
    if (playlist.length > 0) {
      const videoIds = playlist.flatMap((playlist) => playlist.videoIdList);
      fetchVideoDetails(videoIds); // 비디오 정보 가져오기
    }
  }, [playlist]); // playlist가 변경될 때마다 비디오 정보 가져오기
    





	return (
        <Panel {...rest} style={{ height: '100vh', width:'100vw', overflow: 'auto', backgroundColor:'#FAF0E6' }} className={css.panel}>
    <Header> 
                <span
                    style={{
                    color: '#000', // 검은 글씨
                    fontWeight: 'bold', // 두꺼운 글씨
                    fontSize: '45px', // 글씨 크기
                    }}
                >
                플레이리스트
                </span>
          </Header>
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
                    <Row className={css.playlistRow}
                        wrap={false} // 자동 줄 바꿈 비활성화
                        style={{
                            overflowX: 'auto', // 가로 스크롤 활성화
                            whiteSpace: 'nowrap', // 가로로 아이템이 나열되도록 설정
                            padding: '10px 0', // 약간의 패딩 추가

                            /* 스크롤바 숨기기 */
                            scrollbarWidth: 'none', // Firefox 스크롤바 제거
                            msOverflowStyle: 'none', // Internet Explorer 스크롤바 제거
                        }}
                    >
                        {playlist.videoIdList.map((videoId) => {
                            const video = videoData.find((v) => v.id === videoId); // 비디오 ID에 해당하는 비디오 찾기
                            if (!video) return null; // 비디오가 없으면 렌더링하지 않음

                            return (
                                <Cell key={video.id} className={css.videoItem} onClick={() => handleVideoClick(video, playlist)}>
                                    <ImageItem
                                        src={video.thumbUrl} // 썸네일 이미지
                                        label={video.description}  // 비디오 설명
                                        
                                        className={css.imageItem}
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
