import { Panel, Header } from '@enact/sandstone/Panels';
import { Heading } from '@enact/sandstone/Heading';
import React, { useState, useContext, useEffect } from 'react';
import SearchComponent from '../components/SearchComponent';
import SearchResults from '../components/SearchResults';
import axiosInstance from '../auth/axiosInstance';
import { PanelContext } from '../views/Context';
import Spinner from '@enact/sandstone/Spinner';
import IconItem from '@enact/sandstone/IconItem';
import Icon from '@enact/sandstone/Icon';

import css from './SearchView.module.less';

const SearchView = (props) => {
    const { data, ...rest } = props;
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
    const { setPanelData } = useContext(PanelContext);

    // 부모 컴포넌트에서 전달받은 쿼리로 검색
    const query = props.data?.query || '';  // 'data.query'로 전달받은 검색어를 사용
    const index = data?.index ?? 0;

    useEffect(() => {
        if (query && query !== searchQuery) {  // 중복 방지: 기존 검색어와 비교
            handleSearch(query);
        }
    }, [query]);

    const handleSearch = async (query) => {
        setSearchQuery(query);  // 검색어 저장
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axiosInstance.get(`/api/video/search?query=${encodeURIComponent(query)}`);
            setResults(response.data.result.list);
        } catch (error) {
            setErrorMessage('검색 중 오류가 발생했습니다!!!.');
        } finally {
            setLoading(false);
        }
    };

    const handleVideoClick = (video) => {
        setPanelData(prev => [...prev, { name: 'video', data: { index: index + 1, video: video } }]);
    };

    // 홈 버튼 클릭 시 실행될 함수
    const handleHomeClick = () => {
        setPanelData(prev => [
            ...prev,
            { name: 'main', data: {} }  // 'main' 패널로 이동
        ]);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Panel {...rest} className={css.searchviewPanel} noCloseButton={true} >
            <Header
                title={<span className={css.customTitle}>Search Video</span>}
            />
            <IconItem
            className={css.homeIcon}
            onClick={handleHomeClick}
            aria-label="Go to Home"
            >
            <Icon>home</Icon>
             </IconItem>
            <SearchComponent onSearch={handleSearch} />
            {errorMessage && <Heading>{errorMessage}</Heading>}
            {/* 검색어가 있을 때만 결과 표시 */}
            {searchQuery && (
                <>
                    {results.length > 0 ? (
                        <SearchResults
                            results={results}
                            onVideoClick={handleVideoClick}
                            query={searchQuery}  // 검색어 전달
                        />
                    ) : (
                        <Heading>검색 결과가 없습니다.</Heading> 
                    )}
                </>
            )}
        </Panel>
    );
};

export default SearchView;
