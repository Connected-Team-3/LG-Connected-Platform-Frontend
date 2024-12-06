import { useState } from 'react';
import { Input } from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';
import { Row, Cell } from '@enact/ui/Layout';

const SearchComponent = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    // Handle input change
    const handleInputChange = (e) => {
        setQuery(e.value); // e.value로 접근해야 올바르게 값이 설정됩니다.
    };

    // Handle search action
    const handleSearch = () => {
        if (query) {
            onSearch(query); // 검색 요청 핸들러 호출
        }
    };

    return (
        <Row align="center" wrap>
            <Cell>
                <Input
                    placeholder="제목, 요리명, 재료명으로 검색"
                    value={query}
                    onChange={handleInputChange} // 실시간 입력 업데이트
                    onComplete={handleSearch} // Enter 키로 검색 실행
                />
            </Cell>
            <Cell>
                <Button onClick={handleSearch}>검색</Button>
            </Cell>
        </Row>
    );
};

export default SearchComponent;
