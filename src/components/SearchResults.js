import React from 'react';
import { Row, Cell } from '@enact/ui/Layout';
import { MediaOverlay } from '@enact/sandstone/MediaOverlay';
import { Heading } from '@enact/sandstone/Heading'; // Heading 컴포넌트 추가
import { Panel, Header } from '@enact/sandstone/Panels'; // Panel, Header 추가

import css from './SearchResults.module.less';

const SearchResults = ({ results, onVideoClick, query }) => {
    return (
        <Panel noCloseButton={true} style={{ height: '100%', overflow: 'auto'}}>
            {/* 검색 결과가 있을 때만 Header 표시 */}
            {results.length > 0 && (
                <Header
                    //title={`"${query}"로 검색한 결과`} />  //close 버튼 숨김
                    title={<span className={css.searchHeader}>{`"${query}"로 검색한 결과`}</span>}
                />
            )}

            {/* 검색 결과가 없을 경우 "결과가 없습니다" 메시지 표시 */}
            {results.length === 0 && (
                <Heading>검색 결과가 없습니다.</Heading>
            )}

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
        </Panel>
    );
};

export default SearchResults;
