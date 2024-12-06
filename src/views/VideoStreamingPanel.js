import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import Video from './Video';
import Button from '@enact/ui/Button';
import { PageViews, Page } from '@enact/sandstone/PageViews';
import Item from '@enact/sandstone/Item';

const VideoStreamingPanel = props => {
	const {data, ...rest} = props;
    const index = data?.index ?? 0;
	const {setPanelData} = useContext(PanelContext);
    
	// return (
	// 	<Panel {...rest}>
    //         <Header title={`Video`} />
	// 		<Video data={data} />
	// 		<Button>dfd</Button>
	// 	</Panel>
	// );

	return (
		<Panel {...rest}>
			<Header title={`Video`} />
		<PageViews
			pageIndicatorType="dot"
			>
			<Page>
			<Video data={data} />
			</Page>
			<Page aria-label="This is a description for page 1">
	
				<Item>
					Item 1
				</Item>
				<Item>
					Item 2
				</Item>
			</Page>
			</PageViews>
			</Panel>
	)

};

export default VideoStreamingPanel;
