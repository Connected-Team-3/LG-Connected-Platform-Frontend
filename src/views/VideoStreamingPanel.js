import { Header, Panel } from '@enact/sandstone/Panels';
import { PanelContext } from './Context';
import { useContext, useState } from 'react';
import Video from './Video';
import { PageViews, Page } from '@enact/sandstone/PageViews';
import Item from '@enact/sandstone/Item';
import IconItem from '@enact/sandstone/IconItem';
import Icon from '@enact/sandstone/Icon';
import { Layout, Cell } from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';
import axiosInstance from '../auth/axiosInstance';

const VideoStreamingPanel = (props) => {
  const { data, ...rest } = props;
  const { setPanelData } = useContext(PanelContext);
  const video = data?.video; // Video data 가져오기
  const [cartItems, setCartItems] = useState([]);
  
  if (!video) return null;

  // 장바구니에 비디오 추가 (POST)
  const handleAddToCart = async () => {
    try {
        const videoId = video.id;  // videoId는 video 객체에서 직접 가져옵니다
        console.log('ID ', {videoId});
        await axiosInstance.post(`/api/cart/add/${videoId}`);
        console.log('장바구니에 비디오 추가됨:', videoId);
    } catch (error) {
        console.error('장바구니 추가 실패:', error);
    }
  };

  // 부가정보 검색용
  const handleIngredientClick = (ingredient) => {
    setPanelData(prev => [
      ...prev,
      { name: 'search', data: { query: ingredient } }  // 'searchView'로 페이지 이동
    ]);
  };

  const handleFoodNameClick = () => {
    setPanelData(prev => [
      ...prev,
      { name: 'search', data: { query: video.foodName } }  // 'searchView'로 페이지 이동
    ]);
  };

  // 부가 정보 (예시로 video.ingredients 사용)
  const ingredients = video?.ingredients || []; // video.ingredients를 부가정보로 사용

  // Header의 홈 버튼 클릭 시 Main 화면으로 돌아가기
  const handleHomeClick = () => {
    setPanelData(prev => [
      ...prev.filter(panel => panel.name !== 'videoList'),  // 기존 패널을 필터링하여 Main 화면으로 이동
      { name: 'main', data: {} }  // 'main' 패널로 이동
    ]);
  };


  return (
    <Panel {...rest} noCloseButton={true} style={{ height: '100%', overflow: 'auto'}}>
      <Header
        title={`${video.title}`}
        slotAfter={
          <IconItem onClick={handleHomeClick} aria-label="Go to Home">
            <Icon>home</Icon>
          </IconItem>
        }
      />
      <PageViews pageIndicatorType="dot">
        <Page>
          <Video data={data} />
        </Page>
        <Page aria-label="This is a description for page 1">
          {/* 음식 이름과 장바구니 추가 버튼 */}
          <Layout align="center start" style={{ padding: '10px' }}>
            <Cell>
              <Item onClick={handleFoodNameClick}>
                {video.foodName}
              </Item>
            </Cell>
            <Cell>
              <Item onClick={handleAddToCart}>
                {'장바구니 추가'}
              </Item>
            </Cell>
          </Layout>
          {/* 부가정보를 Item 컴포넌트에 넣기 */}
          {ingredients.map((ingredient, index) => (
            <Layout key={index} align="center start" style={{ padding: '10px' }}>
              <Cell>
                <Item onClick={() => handleIngredientClick(ingredient)}>
                  {ingredient}
                </Item>
              </Cell>
            </Layout>
          ))}
        </Page>
      </PageViews>
    </Panel>
  );
};

export default VideoStreamingPanel;