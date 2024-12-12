import React from 'react';
import { Row, Cell } from '@enact/ui/Layout';
import { MediaOverlay } from '@enact/sandstone/MediaOverlay';
import { Heading } from '@enact/sandstone/Heading'; // Heading 컴포넌트 추가
import { Panel, Header } from '@enact/sandstone/Panels'; // Panel, Header 추가
import ImageItem from '@enact/sandstone/ImageItem';
import css from './SearchResults.module.less';

const SearchResults = ({ results, onVideoClick, query }) => {
    return (
        <Panel noCloseButton={true} style={{ height: '200%', overflow: 'auto' }}>
            {/* 검색 결과가 있을 때만 Header 표시 */}
            {results.length > 0 && (
                <Header
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
                        onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFFFFF'; // 마우스 올렸을 때 배경 흰색
                              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // 그림자 효과
                          }}
                          onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFF6E1'; // 마우스가 떠날 때 배경 복귀
                              e.currentTarget.style.boxShadow = 'none'; // 그림자 제거
                          }}
                        style={{ margin: '1rem' }} // 셀 간 간격 조정
                    >
                        <ImageItem
                            src={video.thumbUrl} // 썸네일 이미지
                            orientation="vertical"
                            style={{
                                width: '100%',
                                height: '400px',
                                transition: 'none' , // 애니메이션 효과 제거
                                transform: 'none', // 확대 효과 제거
                            }}
                        />
                        <span
                            style={{
                                color: '#393D46',
                                textAlign: 'left', // 좌측 정렬
                                marginBottom: '60px', // 하단 여백 늘리기
                                margin: '40px 20px', // 상하 40픽셀, 좌우 20픽셀
                                fontSize: '30px', // 텍스트 크기 조정
                                fontWeight: 'bold', // 글씨 굵게
                                width: '100%', // 제목이 썸네일과 맞춰지도록 설정
                            }}
                        >
                            {video.title}
                        </span>
                    </Cell>
                ))}
            </Row>
        </Panel>
    );
};

export default SearchResults;
