import React, { useState } from 'react';
import { Panel, Header } from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import RangePicker from '@enact/sandstone/RangePicker'
import BodyText from '@enact/sandstone/BodyText';
import axios from 'axios';

const AlarmPanel = () => {
    const [time, setTime] = useState(0);
  const [alarmId, setAlarmId] = useState(null); // 알람 ID 상태
  const [alarmStatus, setAlarmStatus] = useState(''); // 알람 상태

  // 시간 변경 시 처리 함수
  const handleTimeChange = (e) => {
    setTime(e.value);
    console.log(time);
  };

  // 알람 설정/끄기 함수
  const toggleAlarm = async () => {
    if (alarmId) {
      // 알람이 이미 설정되어 있으면 알람을 취소
      try {
        await axios.post('luna://com.webos.service.sleep/time/alarmRemove', {
          alarmId: alarmId,
        });
        setAlarmId(null); // 알람 ID 초기화
        setAlarmStatus('Alarm removed'); // 알람 해제 상태 업데이트
      } catch (error) {
        console.error('Error removing alarm:', error);
        setAlarmStatus('Error removing alarm');
      }
    } else {
      // 알람을 설정하는 경우
      const relativeTime = `0:${time}:0`;;
      try {
        const response = await axios.post('luna://com.webos.service.sleep/time/alarmAdd', {
          serviceName: '/var/run/ls2/tmp',
          key: 'cookingAlarm', // 알람의 고유 키
          relative_time: relativeTime, // 설정된 시간
          subscribe: true, // 알람 구독
        });

        setAlarmId(response.data.alarmId); // 알람 ID 저장
        setAlarmStatus(`Alarm set for ${time}`);
      } catch (error) {
        console.error('Error setting alarm:', error);
        setAlarmStatus('Error setting alarm');
      }
    }
  };

  return (
    <Panel>
     <Header title="타이머" />
     <RangePicker
        changedBy="enter"
        defaultValue={0}
        max={60}
        min={0}
        onChange={handleTimeChange}
        orientation="vertical"
        step={1}
        width="small"
        />
      <Button onClick={toggleAlarm}>
        {alarmId ? '타이머 종료' : '타이머 설정'}
      </Button>
    </Panel>
  );
};

export default AlarmPanel;
