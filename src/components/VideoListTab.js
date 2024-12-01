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

const categories = ['KOREAN_FOOD', 'JAPANESE_FOOD', 'CHINESE_FOOD', 'WESTERN_FOOD', 'SNACK_BAR', 'DESSERT', 'VEGETARIAN'];


const VideoListTab = () => {
	const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
	const [dropdownOpen, setDropdownOpen] = useState(false);

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
                setVideoData(response.data);  // API에서 반환된 데이터로 상태 설정
				console.log(response);
            } catch (error) {
                console.error('Error fetching video data:', error);
            } finally {
                setLoading(false); // 로딩 상태 비활성화
            }
        };

        fetchVideos();
    }, [selectedCategory]);

	if (loading) {
        return <Spinner />
    }

	const renderItem = (index) => {
        const video = videoData[index]; // 해당 인덱스의 동영상
        return (
            <Item key={index}>
                <MediaOverlay
                    src={video.thumbnail}
                    title={video.title}
                    description={video.description}
                    duration={video.duration}
                />
            </Item>
        );
    };

	return (
		<Panel>
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

            {/* 동영상 리스트 */}
            <VirtualGridList
                itemRenderer={renderItem}  // 항목을 어떻게 그릴지 정의
                dataSize={videoData.length}  // 데이터의 길이
                itemSize={{ minWidth: 360, minHeight: 240 }}  // 항목의 크기 설정
            />
		</Panel>
    );
};

export default VideoListTab;
