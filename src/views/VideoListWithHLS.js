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
import styles from './VideoListWithHLS.module.less'; // styles.module.less 파일을 import



const ids = [3, 5, 6, 7, 8];


const VideoListWithHLS = props => {
	const {data,...rest} = props;
	const index = data?.index ?? 0;
	const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);
	const {setPanelData} = useContext(PanelContext);
	const handleVideoClick = useCallback((video) => {
        // setPanelData(prev => {
        //      [...prev, { name: 'hls', data: { index: index + 1, videoId: video.id } }];
        //     //console.log('Panel stack after video click:', updatedData); // 변경된 패널 스택을 로그로 출력
        //     return updatedData;
        // });
        setPanelData(prev => [...prev, { name: 'hls', data: { index: index + 1, videoId: video.id} }]);
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
      <Panel
          {...rest}
          style={{
              height: '100%',
              overflow: 'auto',
              backgroundColor: '#FFF6E1', // 기본 배경색
              padding: '5px',
          }}
      >
          <div
              style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)', // 한 줄에 3개씩 고정
                  gap: '20px', // 아이템 간격
              }}
          >
              {videoData.map((video) => {
                  if (!video) return null;

                  return (
                      <div
                          key={video.id}
                          style={{
                              width: '100%', // 부모 그리드 크기에 따라 자동 조정
                              height: '400px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start', // 텍스트를 좌측 정렬
                              cursor: 'pointer',
                              backgroundColor: '#FFF6E1', // 기본 배경색
                              padding: '10px',
                              boxShadow: 'none', // 기본 상태에서 그림자 없음
                              transition: 'background-color 0.3s, box-shadow 0.3s', // 애니메이션 효과
                          }}
                          onClick={() => handleVideoClick(video)}
                          onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFFFFF'; // 마우스 올렸을 때 배경 흰색
                              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // 그림자 효과
                          }}
                          onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFF6E1'; // 마우스가 떠날 때 배경 복귀
                              e.currentTarget.style.boxShadow = 'none'; // 그림자 제거
                          }}
                      >
                          <ImageItem
                              src={video.thumbUrl} // 썸네일 이미지
                              orientation="vertical"
                              className={styles['no-transition-image']} // CSS 모듈로 클래스를 적용
                              style={{
                                  width: '100%',
                                  height: '300px',
                                  padding: '5px', // 패딩 감소
                                  transition: 'none', // 애니메이션 효과 제거
                                  transform: 'none', // 확대 효과 제거
                              }}
                              
                          />
                          <span
                              style={{
                                  color: '#393D46',
                                  textAlign: 'left', // 좌측 정렬
                                  marginTop: '10px', // 썸네일과 간격 줄이기
                                  marginBottom: '10px', // 하단 여백 제거
                                  fontSize: '30px', // 텍스트 크기 조정
                                  fontWeight: 'bold', // 글씨 굵게
                                  width: '100%', // 제목이 썸네일과 맞춰지도록 설정
                              }}
                          >
                              {video.title}
                          </span>
                      </div>
                  );
              })}
          </div>
      </Panel>
  );


  
  
};

export default VideoListWithHLS;