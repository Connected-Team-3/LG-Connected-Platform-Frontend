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
import './VideoListTab.css'

import React from 'react';
import HeaderMessage from '../views/HeaderMessage';


const categories = ['KOREAN_FOOD', 'JAPANESE_FOOD', 'CHINESE_FOOD', 'WESTERN_FOOD', 'SNACK_BAR', 'DESSERT', 'VEGETARIAN'];


const VideoListTab = props => {
	const {data, userName,logo, ...rest} = props;
	const index = data?.index ?? 0;
	const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('KOREAN_FOOD');
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
		<Panel {...rest} style={{ height: '100vh', width:'100vw', overflow: 'auto', backgroundColor: '#FAF0E6', margin:'0' }}>
            {/* HeaderMessage 추가 */}
            
            {/* <HeaderMessage userName={userName} logo={logo} /> */}
            
            {/* 카테고리 선택 */}
            <Dropdown
                direction="below"
                open={dropdownOpen}
                onClose={() => setDropdownOpen(false)}
                onOpen={() => setDropdownOpen(true)}
				onSelect={handleCategorySelect}
                size="small"
                title="카테고리 선택"
                width="medium"
            >
                {categories}
            </Dropdown>

            <Row wrap
            >
                {videoData.map((video) => {
                    if (!video) return null; // 비디오가 없으면 렌더링하지 않음

                    return (
                        <Cell key={video.id} style={{ width: '150px', height: '250px', marginRight: '10px' }} onClick={() => handleVideoClick(video)}>
                            <ImageItem
                                src={video.thumbUrl} // 썸네일 이미지
                                label={video.description}  // 비디오 설명
                                orientation="horizontal"
                                style={{color:'#000'}}
                            >
                                {/* {video.title} */}
                                <span style={{color: '#000'}}>{video.title}</span>
                            </ImageItem>
                        </Cell>
                    );
                })}
            </Row>
		</Panel>
    );
};

export default VideoListTab;

// {videoData.map((video) => ( 
//     <Cell key={video.id} size="auto" onClick={() => handleVideoClick(video)}>
//     <MediaOverlay
//         marqueeOn="focus"
//         muted
//         subtitle={video.description}
//         textAlign="end"
//         title={video.title}
//     >
//         <source src={video.sourceUrl} />
//     </MediaOverlay>
// </Cell>
// ))}
