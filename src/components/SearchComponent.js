import { useState } from 'react';
import { Input, InputField} from '@enact/sandstone/Input';
import Button from '@enact/sandstone/Button';
import { Row, Cell } from '@enact/ui/Layout';
import styles from './SearchComponent.module.less'; // 스타일 파일 임포트
import Icon from '@enact/sandstone/Icon'
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
        <Row className={styles['search-row']} align="center" >
            <Cell>
                <InputField 
                    className={styles['search-input']} 
                    placeholder="제목, 요리명, 재료명으로 검색"
                    value={query}
                    onChange={(e) => setQuery(e.value)}
                    onComplete={handleSearch} // Enter 키로 검색 실행
                    skin="dark"
                    style={{ marginBottom: '10px' }}
                    //autoFocus
                />
            </Cell>
            <Cell shrink>
                <Button
                    className={styles['search-button']}  
                    size='small'
                    onClick={handleSearch}><Icon>search</Icon></Button>
            </Cell>
        </Row>
    );
};

export default SearchComponent;