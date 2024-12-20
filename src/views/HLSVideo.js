import {useRef, useEffect, useCallback, useState, useContext} from 'react';
import Button from '@enact/sandstone/Button'
import Hls from 'hls.js';
import axiosInstance from '../auth/axiosInstance';
import { Panel, Header } from '@enact/sandstone/Panels';
import {PanelContext} from './Context';
import icon from '@enact/sandstone/Icon'
const HLSVideo = (props) => {
	const {data, ...rest} = props;
	const index = data?.index ?? 0;
	const {setPanelData} = useContext(PanelContext);
	const videoId = data.videoId;
	const videoRef = useRef(null);
	const hlsRef = useRef(null);
	const [hlsInstance, setHlsInstance] = useState(null);
	const [quality, setQuality] = useState(null);
	// 뒤로 가기 기능을 위한 핸들러
	const handleGoBack = () => {
		setPanelData(prev => prev.slice(0, prev.length - 1));
	};
	useEffect(() => {
		const videoUrl = `https://connectedplatform.s3.ap-northeast-2.amazonaws.com/hls/hls_${videoId}/master_playlist.m3u8`;

		//const videoUrl = `stream/hls/hls_${videoId}/master_playlist.m3u8`;
		if (Hls.isSupported()) {
			const video = videoRef.current;
			const hls = new Hls();
			hls.loadSource(videoUrl);
			hls.attachMedia(video);

			// triggered when the loaded manifest is parsed.s
			hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
				console.log(
					'>>>>>>>>>>>> manifest loaded, found ' +
						data.levels.length +
						' quality level'
				);
				video.play();
			});
			hlsRef.current = hls;

			// triggered when a new segment (fragment) is loaded.
			// eslint-disable-next-line
			hls.on(Hls.Events.FRAG_LOADED, function (event, data) {
				console.log(
					'========================================================='
				);
				console.log(
					'>>>>>>>>>>>> Estimated bandwidth:',
					hls.bandwidthEstimate + ' bps'
				);

				const index = hls.currentLevel;
				const level = hls.levels[index];

				console.log('>>>>>>>>>>>> currentLevel:', hls.currentLevel);
				console.log('>>>>>>>>>>>> levels:', hls.levels);
				console.log('>>>>>>>>>>>> loadLevel:', hls.loadLevel);

				if (level) {
					if (level.height) {
						console.log(
							'>>>>>>>>>>>> Selected resolution:',
							level.height + 'p'
						);
					}
					if (level.bitrate) {
						console.log(
							'>>>>>>>>>>>> Selected bandwidth:',
							Math.round(level.bitrate / 1000) + ' kbps'
						);
						if (index !== -1 && index >= 0) {
							console.log(
								'>>>>>>>>>>>> Selected bandwidth:',
								hls.levels[index].attrs.BANDWIDTH + ' bps'
							);
						}
					}

					setHlsInstance(hls);
					hlsRef.current = hls;
				}
				return () => {
					if (hlsRef.current) {
						hlsRef.current.destroy();
						}
					};
			});
		}
	}, [props.src]);

	const handleQualityChange = (newQuality) => {
		if (hlsInstance) {
		  // `newQuality`는 품질 레벨의 인덱스 (0, 1, 2, ...)
			hlsInstance.currentLevel = newQuality;
			setQuality(newQuality);
			console.log(`품질 레벨이 ${newQuality}로 변경되었습니다.`);
			}
	  	};

	const handleZeroClick = useCallback(() => {
		console.log('Button clicked!');
		hlsRef.current.currentLevel = 0;
	}, []);

	const handleAutoClick = useCallback(() => {
		console.log('Button clicked!');
		hlsRef.current.currentLevel = -1; // Auto resolution switching
	}, []);

	return (
		<Panel >

				<Button onClick={() => handleQualityChange(0)}>Low Quality</Button>
				<Button onClick={() => handleQualityChange(1)}>Medium Quality</Button>
				<Button onClick={() => handleQualityChange(2)}>High Quality</Button>
				<Button className="btn" onClick={handleAutoClick}>
					Auto
				</Button>


			<video ref={videoRef} controls height={720} />
			</Panel>
	);
};

export default HLSVideo;