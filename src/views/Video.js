import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import Button from '@enact/sandstone/Button';
import { Panel } from '@enact/sandstone/Panels';
import {useCallback, useContext} from 'react';
import {PanelContext} from './Context';

const Video = ({data}) => {
	if (!data) return null;

	return (
		<VideoPlayer
			autoCloseTimeout={7000}
			backButtonAriaLabel={null}
			feedbackHideDelay={3000}
			initialJumpDelay={400}
			jumpDelay={200}
			loop
			miniFeedbackHideDelay={2000}
			muted
			title={data.title}
			titleHideDelay={4000}
		>
			<source src={data.src} type="video/mp4" />
			<infoComponents>{data.description}</infoComponents>
			<MediaControls
				jumpBackwardIcon="jumpbackward"
				jumpForwardIcon="jumpforward"
				pauseIcon="pause"
				playIcon="play"
			>
				<Button icon="list" size="small" />
				<Button icon="playspeed" size="small" />
				<Button icon="speakercenter" size="small" />
				<Button icon="miniplayer" size="small" />
				<Button icon="subtitle" size="small" />
			</MediaControls>
		</VideoPlayer>
	);
};

export default Video;
