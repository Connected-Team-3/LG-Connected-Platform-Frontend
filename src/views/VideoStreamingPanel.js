import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import Video from './Video';

const VideoStreamingPanel = () => {
    const location = useLocation();
    const {video, playlist} = location.state || {};
    const [currentIndex, setCurrentIndex] = useState(
        playlist.videos.findIndex((v) => v.id === video.id)
    );

    const handleNext = () => {
        if (currentIndex < playlist.videos.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div>
            <Video
                data={playlist.videos[currentIndex]}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />
        </div>
    );
};

export default VideoStreamingPanel;
