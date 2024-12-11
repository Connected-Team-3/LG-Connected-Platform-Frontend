import {useRef, useEffect, useCallback, useState} from 'react';
import Button from '@enact/sandstone/Button'
import Hls from 'hls.js';
import axiosInstance from '../auth/axiosInstance';

const HLSVideo = (props) => {
	const videoRef = useRef(null);
	const hlsRef = useRef(null);
	const [hlsInstance, setHlsInstance] = useState(null);
	const [quality, setQuality] = useState(null);

	useEffect(() => {
		const videoUrl = `stream/hls/hls_6/master_playlist.m3u8`;
		
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
		<>
			<div style={{backgroundColor:'#FFF6E1'}}>
			<div>
				<Button onClick={() => handleQualityChange(0)}>Low Quality</Button>
				<Button onClick={() => handleQualityChange(1)}>Medium Quality</Button>
				<Button onClick={() => handleQualityChange(2)}>High Quality</Button>
				<Button className="btn" onClick={handleAutoClick}>
					Auto
				</Button>
			</div>

				<video ref={videoRef} controls height={720} />
				</div>
		</>
	);
};

export default HLSVideo;
