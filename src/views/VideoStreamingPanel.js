import {Header, Panel} from '@enact/sandstone/Panels';
import {Row, Cell} from '@enact/ui/Layout';
import {PanelContext} from './Context';
import {useCallback, useContext} from 'react';
import Video from './Video';

const VideoStreamingPanel = props => {
	const {data, ...rest} = props;
    const index = data?.index ?? 0;
	const {setPanelData} = useContext(PanelContext);
    const video = data?.video;  // Video data 가져오기 추가
	if (!video) return null;
	/*부가정보 검색용*/
    const handleIngredientClick = (ingredient) => {
        setPanelData(prev => [...prev, {name: 'search', data: {query: ingredient}}]);
    };

    const handleFoodNameClick = () => {
        setPanelData(prev => [...prev, {name: 'search', data: {query: data.video.foodName}}]);
    };

return (
    <Panel scrollable {...rest}>
        <Header title={`Video`} />
        
        <Row wrap style={{marginTop: '2rem'}}>
            <Cell size="100%">
                <Video data={data} />
            </Cell>
            <Cell size="50%">
                <h3 onClick={handleFoodNameClick} style={{cursor: 'pointer', color: 'blue'}}>
                    요리 이름: {data.video.foodName}
                </h3>
            </Cell>
            <Cell size="50%">
                <h4>재료:</h4>
                <ul>
                    {data.video.ingredients.map((ingredient, index) => (
                        <li
                            key={index}
                            onClick={() => handleIngredientClick(ingredient)}
                            style={{cursor: 'pointer', color: 'blue'}}
                        >
                            {ingredient}
                        </li>
                    ))}
                </ul>
            </Cell>
        </Row>
    </Panel>
);

};

export default VideoStreamingPanel;