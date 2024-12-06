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

const SearchView = (props) => {
    const {data, ...rest} = props;
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
    const { setPanelData } = useContext(PanelContext);

    // 부모 컴포넌트에서 전달받은 쿼리로 검색
    const query = props.data?.query || '';  // 'data.query'로 전달받은 검색어를 사용

    useEffect(() => {
        if (query) {
            handleSearch(query); // 쿼리가 있으면 검색 실행
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
            setErrorMessage('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleVideoClick = (video) => {
        setPanelData(prev => [...prev, { name: 'video', data: { video } }]);
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
        <Panel {...rest} noCloseButton={true} >
            <Header
                title="Search Video"
                slotAfter={
                    <IconItem onClick={handleHomeClick} aria-label="Go to Home">
                        <Icon>home</Icon>
                    </IconItem>
                }
            />
            <SearchComponent onSearch={handleSearch} />
            {errorMessage && <Heading>{errorMessage}</Heading>}
            {/* 검색어와 결과를 표시 */}
            <SearchResults 
                results={results} 
                onVideoClick={handleVideoClick} 
                query={searchQuery}  // 검색어 전달
            />
        </Panel>
    );
};

export default SearchView;
