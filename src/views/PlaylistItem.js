import React from 'react';

const PlaylistItem = ({playlist, onClick}) => (
    <div
        style={{
            border: '1px solid gray',
            padding: '10px',
            margin: '10px',
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        <h4>{playlist.name}</h4>
    </div>
);

export default PlaylistItem;
