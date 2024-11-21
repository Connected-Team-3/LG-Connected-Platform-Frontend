import {useState, useMemo, useCallback, useContext} from 'react';
import {Item} from '@enact/sandstone/Item';
import {Group} from '@enact/ui/Group';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {Scroller} from '@enact/sandstone/Scroller';
import {MediaOverlay} from '@enact/sandstone/MediaOverlay';
import {scaleToRem} from '@enact/ui/resolution';
import {PanelContext} from '../views/Context';
import {Row, Cell} from '@enact/ui/Layout';

const videoData = [
	{category: 'Movies', title: 'Movie 1', description: 'A great movie', thumbnail: 'https://via.placeholder.com/360x240', duration: '2:30', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
	{category: 'Movies', title: 'Movie 2', description: 'Another great movie', thumbnail: 'https://via.placeholder.com/360x240', duration: '1:45', src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'},
	{category: 'Sports', title: 'Sports 1', description: 'Exciting sports video', thumbnail: 'https://via.placeholder.com/360x240', duration: '3:15', src: 'https://example.com/sports1.mp4'},
	{category: 'Music', title: 'Music 1', description: 'A beautiful music video', thumbnail: 'https://via.placeholder.com/360x240', duration: '4:20', src: 'https://example.com/music1.mp4'},
	{category: 'Music', title: 'Music 2', description: 'Another beautiful music video', thumbnail: 'https://via.placeholder.com/360x240', duration: '5:10', src: 'https://example.com/music2.mp4'},
];

const categories = ['All', 'Movies', 'Sports', 'Music', 'News', 'Drama', 'Kids', 'Comedy', 'Education'];

const CategoryFilter = ({selectedCategory, onSelectCategory}) => {
	return (
		<Row
			align="center" // 항목을 가운데 정렬
			style={{
				height: scaleToRem(100),
				marginBottom: scaleToRem(50),
				flexWrap: 'wrap', // 화면에 공간이 부족할 경우 자동 줄바꿈
			}}
		>
			{categories.map((category) => (
				<Cell
					key={category}
					component={Item}
					onClick={() => onSelectCategory(category)}
					style={{
						margin: `0 ${scaleToRem(10)}`,
						backgroundColor: selectedCategory === category ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
						borderRadius: scaleToRem(10),
						textAlign: 'center',
						minWidth: scaleToRem(80), // 최소 너비 설정
						height: scaleToRem(50), // 높이 설정
					}}
				>
					{category}
				</Cell>
			))}
		</Row>
	);
};

const FilteredVideos = ({category}) => {
	const {setPanelData} = useContext(PanelContext);

    const filteredVideos = useMemo(() => {
        if (category === 'All') return videoData;
        return videoData.filter(video => video.category === category);
    }, [category]);

    const handleVideoClick = useCallback(
        video => () => {
            setPanelData(prev => [...prev, {name: 'video', data: video}]);
        },
        [setPanelData]
    );

    return (
        <Scroller>
            {filteredVideos.map((video, index) => (
                <MediaOverlay
                    key={index}
                    style={{margin: '10px'}}
                    image={video.thumbnail}
                    title={video.title}
                    subtitle={video.description}
                    duration={video.duration}
                    onClick={handleVideoClick(video)}
                />
            ))}
        </Scroller>
    );
};


const VideoListTab = () => {
	const [selectedCategory, setSelectedCategory] = useState('All');

	return (
        <div style={{padding: scaleToRem(20)}}>
            <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            <FilteredVideos category={selectedCategory} />
        </div>
    );
};

export default VideoListTab;
