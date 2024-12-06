import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Video from './Video'; // Video 컴포넌트 가져오기
import { getVideoById } from '../api/video'; // API 호출 함수 가져오기

const Playlist = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { playlist } = location.state || { playlist: { title: 'Untitled Playlist', videoIdList: [] } };
    const [videos, setVideos] = useState([]); // 비디오 데이터를 저장할 상태

    // Fetch video data when the component mounts
    useEffect(() => {
        console.log('Playlist component mounted');
        console.log('Received playlist data:', playlist);

        const fetchVideos = async () => {
            if (!playlist.videoIdList || playlist.videoIdList.length === 0) {
                console.warn('No videoIdList available in playlist:', playlist);
                return;
            }

            try {
                // 각 비디오 ID로 API 호출
                const videoPromises = playlist.videoIdList.map((videoId) => getVideoById(videoId));
                const videoResponses = await Promise.all(videoPromises);
                const videoData = videoResponses.map((response) => response.result.data); // API 응답에서 데이터 추출
                setVideos(videoData); // 비디오 데이터 상태로 설정
                console.log('Fetched video data:', videoData);
            } catch (error) {
                console.error('Error fetching videos for playlist:', error);
            }
        };

        fetchVideos();
    }, [playlist]);

    // Handle video click (optional: for individual video navigation)
    const handleVideoClick = (video) => {
        navigate('/video-stream', { state: { video, playlist } });
    };

    // Render fallback message if no videos are available
    if (!videos || videos.length === 0) {
        return <div>No videos available in this playlist</div>;
    }

    return (
        <div>
            <h2>{playlist.title || 'Untitled Playlist'}</h2>
            <div>
                {videos.map((video) => (
                    <div key={video.id} style={{ marginBottom: '20px' }}>
                        {/* Video 컴포넌트를 사용하여 렌더링 */}
                        <Video data={{ title: video.title, video }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Playlist;
