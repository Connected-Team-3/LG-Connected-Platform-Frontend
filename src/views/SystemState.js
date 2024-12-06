import {useEffect, useRef, useState} from 'react';

import debugLog from '../libs/log';
import {getMemoryInfo, getCpuInfo} from '../libs/services';
import RenderingGraph from './RenderingGraph';
import RenderingMemoryGraph from './RenderingMemoryGraph';
import RenderingLoading from './RenderingLoading';

const SystemState = () => {
	const cpuRef = useRef(null);
	const memRef = useRef(null);
	const [curCpu, setCurCpu] = useState([]);
	const [curMem, setCurMem] = useState([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
        console.log('system mounted');
		// CPU 데이터 구독
		if (!cpuRef.current) {
			cpuRef.current = getCpuInfo({
				parameters: {subscribe: true},
				onSuccess: res => {
					const newCurCpu = res.stat.slice(0, 5).map(stat =>
						stat.split(/\s+/).slice(1, 5)
					);
					setCurCpu(newCurCpu);
				},
				onFailure: err => debugLog('Error in CPU subscription:', err)
			});
		}

		// 메모리 데이터 구독
		if (!memRef.current) {
			memRef.current = getMemoryInfo({
				parameters: {subscribe: true},
				onSuccess: res => {
					setCurMem([res.usable_memory, res.swapUsed]);
				},
				onFailure: err => debugLog('Error in Memory subscription:', err)
			});
		}

		// 로딩 상태 업데이트
		setTimeout(() => setLoading(false), 1000);

		return () => {
			// 구독 해제
			if (cpuRef.current) cpuRef.current.cancel();
			if (memRef.current) memRef.current.cancel();
		};
	}, []);

	return (
		<div>
			{loading ? (
				<RenderingLoading />
			) : (
				<>
					<RenderingGraph cpuUsage={curCpu} />
					<RenderingMemoryGraph memoryUsage={curMem} />
				</>
			)}
		</div>
	);
};

export default SystemState;
