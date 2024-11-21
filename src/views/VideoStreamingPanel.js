import {Header, Panel} from '@enact/sandstone/Panels';
import {PanelContext} from './Context';
import {useCallback, useContext} from 'react';
import Video from './Video';

const VideoStreamingPanel = props => {
	const {data, ...rest} = props;
    const index = data?.index ?? 0;
	const {setPanelData} = useContext(PanelContext);
    
	return (
		<Panel {...rest}>
            <Header title={`Video`} />
			<Video data={data} />
		</Panel>
	);
};

export default VideoStreamingPanel;