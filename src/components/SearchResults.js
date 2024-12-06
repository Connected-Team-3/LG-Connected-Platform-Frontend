import React from 'react';
import { Row, Cell } from '@enact/ui/Layout';
import { MediaOverlay } from '@enact/sandstone/MediaOverlay';

const SearchResults = ({ results, onVideoClick }) => {
    return (
        <Row wrap>
            {results.map((video) => (
                <Cell 
                    key={video.id} 
                    size="30%" 
                    onClick={() => onVideoClick(video)}
                    style={{ margin: '1rem' }} // 셀 간 간격 조정
                >
                    <MediaOverlay
                        marqueeOn="focus"
                        muted
                        subtitle={video.description}
                        textAlign="end"
                        title={video.title}
                    >
                        <source src={video.sourceUrl} />
                    </MediaOverlay>
                </Cell>
            ))}
        </Row>
    );
};

export default SearchResults;
