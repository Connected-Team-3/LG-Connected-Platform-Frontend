import { Panel, Header } from '@enact/sandstone/Panels';
import { Heading } from '@enact/sandstone/Heading';
import React, { useState, useContext, useEffect } from 'react';
import SearchComponent from '../components/SearchComponent';
import SearchResults from '../components/SearchResults';
import axiosInstance from '../auth/axiosInstance';
import { PanelContext } from '../views/Context';
import Spinner from '@enact/sandstone/Spinner';

const SearchView = ({data}) => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
    const [loading, setLoading] = useState(false);
    const { setPanelData } = useContext(PanelContext);

    const handleSearch = async (query) => {
        setLoading(true);
        setErrorMessage(''); // 새 검색 시 에러 메시지 초기화
        try {
            const response = await axiosInstance.get(`/api/video/search?query=${encodeURIComponent(query)}`);
            console.log(response); // 응답을 확인하여 데이터 구조 점검
            if (response.data.result.list.length === 0) {
                setErrorMessage('검색 결과가 없습니다.');
            }
            setResults(response.data.result.list);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setErrorMessage('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };
    // // 부가정보 클릭 후 자동 검색
    // useEffect(() => {
    //     if (data?.query) {
    //         handleSearch(data.query);
    //     }
    // }, [data]);

    const handleVideoClick = (video) => {
        setPanelData(prev => [...prev, { name: 'video', data: { video } }]);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Panel>
            <Header title="Search Video" />
            <SearchComponent onSearch={handleSearch} />
            {/* 검색 결과가 없을 때 에러 메시지 표시 */}
            {errorMessage && <Heading>{errorMessage}</Heading>}
            <SearchResults results={results} onVideoClick={handleVideoClick} />
        </Panel>
    );
};

export default SearchView;
