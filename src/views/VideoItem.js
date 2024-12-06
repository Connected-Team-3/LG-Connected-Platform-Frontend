import React from 'react';

const VideoItem = ({video}) => (
    <div>
        <h4>{video.name}</h4>
        <img src={video.thumbnail} alt={video.name} />
    </div>
);

export default VideoItem;
