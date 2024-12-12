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
import './VideoListTab.css'
import ImageItem from '@enact/sandstone/ImageItem';
import React from 'react';
import HeaderMessage from '../views/HeaderMessage';


const categories = ['ALL', 'KOREAN_FOOD', 'JAPANESE_FOOD', 'CHINESE_FOOD', 'WESTERN_FOOD', 'SNACK_BAR', 'DESSERT', 'VEGETARIAN'];


const VideoListTab = props => {
	const {data, ...rest} = props;
	const index = data?.index ?? 0;
	const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const {setPanelData} = useContext(PanelContext);
	// const handleVideoClick = useCallback((video) => {
	// 	setPanelData(prev => [...prev, {name: 'video', data: {index: index + 1, video: video}}]);
	// }, [index, setPanelData]);

	const handleVideoClick = useCallback((video) => {
        setPanelData(prev => {
            const updatedData = [...prev, { name: 'video', data: { index: index + 1, video: video } }];
            console.log('Panel stack after video click:', updatedData); // 변경된 패널 스택을 로그로 출력
            return updatedData;
        });
    }, [index, setPanelData]);

	
	const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // 드롭다운 항목 선택 핸들러
    const handleCategorySelect = (category) => {
		console.log(category.data);
        setSelectedCategory(category.data);
        setDropdownOpen(false);  // 카테고리 선택 후 드롭다운 닫기
    };


	useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true); // 로딩 상태 활성화
            try {
                const response = await axiosInstance.get(`/api/video/${selectedCategory}`); // 카테고리에 맞는 API 요청
                setVideoData(response.data.result.list);  // API에서 반환된 데이터로 상태 설정
				console.log(response.data.result.list);
            } catch (error) {
                console.error('Error fetching video data:', error);
            } finally {
                setLoading(false); // 로딩 상태 비활성화
            }
        };

        if (selectedCategory !== 'All') {
            fetchVideos();
        } else {
            setVideoData([]);  // 카테고리가 "All"이면 비디오 데이터 초기화
        }
    }, [selectedCategory]);

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
                padding: '10px',
            }}
        >
        {/* 카테고리 선택 */}
        <Dropdown
    direction="below"
    open={dropdownOpen}
    onClose={() => setDropdownOpen(false)}
    onOpen={() => setDropdownOpen(true)}
    onSelect={(category) => handleCategorySelect(category)}
    size="small"
    selected={categories.indexOf(selectedCategory)} // 선택된 카테고리 유지
    width="medium"
>
    {categories}
</Dropdown>

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
                        <Cell key={video.id}  style={{ color: '#000', height: '500px'  }} 
                        onClick={() => handleVideoClick(video)}
                        onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFFFFF'; // 마우스 올렸을 때 배경 흰색
                              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // 그림자 효과
                          }}
                          onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFF6E1'; // 마우스가 떠날 때 배경 복귀
                              e.currentTarget.style.boxShadow = 'none'; // 그림자 제거
                          }}>

                            <ImageItem
                                src={video.thumbUrl} // 썸네일 이미지
                                orientation="vertical"
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    padding: '20px', // 패딩 감소
                                    transition: 'none', // 애니메이션 효과 제거
                                    transform: 'none', // 확대 효과 제거
                                }}
                            />
                            <span
                                style={{
                                    color: '#393D46',
                                    textAlign: 'left', // 좌측 정렬
                                    //marginTop: '10px', // 썸네일과 간격 줄이기
                                    margin: '40px 20px', // 상하 40픽셀, 좌우 20픽셀
                                    fontSize: '30px', // 텍스트 크기 조정
                                    //fontWeight: 'bold', // 글씨 굵게
                                    width: '100%', // 제목이 썸네일과 맞춰지도록 설정
                                }}
                            >
                                {video.title}
                            </span>
                        </Cell>
                    );
                })}
            </div>
        </Panel>
    );
    

// 	return (
// 		<Panel {...rest} style={{ height: '100vh', width:'100vw', overflow: 'auto', backgroundColor: '#FFF6E1', margin:'0' }}>
//             {/* HeaderMessage 추가 */}
            
//             {/* <HeaderMessage userName={userName} logo={logo} /> */}
            
//             {/* 카테고리 선택 */}
//             <Dropdown
//                 direction="below"
//                 open={dropdownOpen}
//                 onClose={() => setDropdownOpen(false)}
//                 onOpen={() => setDropdownOpen(true)}
// 				onSelect={handleCategorySelect}
//                 size="small"
//                 //title="카테고리 선택"
//                 width="medium"
//             >
//                 {categories}
//             </Dropdown>

//             <Row wrap
//             >
//                 {videoData.map((video) => {
//                     if (!video) return null; // 비디오가 없으면 렌더링하지 않음

//                     return (
//                         <Cell key={video.id}  style={{ width: '150px', height: '250px', marginRight: '10px' }} onClick={() => handleVideoClick(video)}>
//                             <ImageItem
//                                 src={video.thumbUrl} // 썸네일 이미지
//                                 l//abel={video.description}  // 비디오 설명
//                                 orientation="horizontal"
//                                 style={{color:'#000'}}
//                             >
//                                 {/* {video.title} */}
//                                 <span style={{color: '#000'}}>{video.title}</span>
//                             </ImageItem>
//                         </Cell>
//                     );
//                 })}
//             </Row>
// 		</Panel>
//     );
};

export default VideoListTab;