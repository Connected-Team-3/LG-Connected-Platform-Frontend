import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Button} from '@enact/sandstone/Button';
import BodyText from '@enact/ui/BodyText';
import Spinner from '@enact/sandstone/Spinner';
import { Header, Panel } from '@enact/sandstone/Panels';
import { Input, InputField } from '@enact/sandstone/Input';
import axiosInstance from '../auth/axiosInstance';
import { PanelContext } from './Context';
import alert from '@enact/sandstone/Alert';

const ProfilePanel = (props) => {
  const { data, ...rest } = props;
  const index = data?.index ?? 0;
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [recommendedMeal, setRecommendedMeal] = useState([]);
  const { panelData, setPanelData } = useContext(PanelContext);
  const [timeOfDay, setTimeOfDay] = useState(''); 
  const handleClick = useCallback(() => {
    setPanelData(prev => [...prev, {name: 'updateprofile', data: {index: index + 1}}]);
}, [index, setPanelData]);

  // 음식 추천 함수
  const getRecommendedMeal = (foodPreferences) => {
    const currentHour = new Date().getHours();


    if (currentHour >= 5 && currentHour < 12) {
      setTimeOfDay('morning'); // 오전
    } else if (currentHour >= 12 && currentHour < 18) {
      setTimeOfDay('afternoon');
    } else if (currentHour >= 18 && currentHour < 22) {
      setTimeOfDay('evening');
    } else {
      setTimeOfDay('night');
    }
    

    // 시간대에 맞는 선호도 배열을 가져오기
    const preferredMeals = foodPreferences[timeOfDay] || [];

    // 더미 데이터에서 추천 식사를 선택
    const dummyMeals = ['오믈렛', '팬케이크', '토스트', '샐러드', '샌드위치', '파스타', '피자', '스테이크', '볶음밥', '라면', '햄버거', '치킨', '양송이 스프', '연어 구이', '꼬치 구이']

    // 선호도에 맞는 식사 추천
    const matchingMeals = preferredMeals.filter(meal => dummyMeals.includes(meal));

    // 일치하는 메뉴가 있다면 추천하고, 없다면 더미 데이터에서 임의로 추천
    const recommended = matchingMeals.length > 0 
      ? matchingMeals[Math.floor(Math.random() * matchingMeals.length)] // 일치하는 항목 중 하나
      : dummyMeals[Math.floor(Math.random() * dummyMeals.length)]; // 임의의 더미 데이터

    setRecommendedMeal(recommended);
  };

  // 유저 데이터 가져오기 (예: API 호출 후, 유저의 foodPreferences를 가져오기)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await axiosInstance.get(`/api/user`);
          console.log(response);
          if (response.data.success) {
            setUserData(response.data.result.data);
          getRecommendedMeal(response.data.result.data.foodPreferences);
          console.log(response.data.result.data.foodPreferences);
          } else {
            setErrorMessage('유저 정보를 가져오는 데 실패했습니다.');
          }
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('유저 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchUserData();
  }, []); 




  return (
    <Panel {...rest}>
      <Header title="사용자 프로필" />
      {userData ? (
        <>
          <BodyText>{userData.name}님의 음식 선호도:</BodyText>
          {userData.foodPreferences && Object.keys(userData.foodPreferences).length > 0 ? (
            <>
            {userData.foodPreferences.morning && (
                <BodyText>{`아침: ${userData.foodPreferences.morning.join(', ')}`}</BodyText>
              )}
              {userData.foodPreferences.afternoon && (
                <BodyText>{`점심: ${userData.foodPreferences.afternoon.join(', ')}`}</BodyText>
              )}
              {userData.foodPreferences.evening && (
                <BodyText>{`저녁: ${userData.foodPreferences.evening.join(', ')}`}</BodyText>
              )}
              {userData.foodPreferences.night && (
                <BodyText>{`밤: ${userData.foodPreferences.night.join(', ')}`}</BodyText>
              )}
              </>
          ) : (
          <BodyText>아직 데이터가 없어요</BodyText>
          ) }
          

          {/* 시간대에 맞는 추천 메뉴 출력 */}
          {recommendedMeal && (
            <BodyText>{`오늘 ${timeOfDay === 'morning' ? '아침' : timeOfDay === 'afternoon' ? '점심' : timeOfDay === 'evening' ? '저녁' : '야식'}으로 ${recommendedMeal} 어때요?`}</BodyText>
          )}
        </>
      ) : (
        <Spinner />
      )}
      <Button onClick={handleClick}>프로필 수정하기</Button>
    </Panel>
  );
};

export default ProfilePanel;
