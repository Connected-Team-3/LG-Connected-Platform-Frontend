import { Header, Panel } from '@enact/sandstone/Panels';
import { PanelContext } from './Context';
import { useContext, useState } from 'react';
import Video from './Video';
import { PageViews, Page } from '@enact/sandstone/PageViews';
import Item from '@enact/sandstone/Item';
import IconItem from '@enact/sandstone/IconItem';
import Icon from '@enact/sandstone/Icon';
import alert from '@enact/sandstone/Alert';
import { Layout, Cell } from '@enact/ui/Layout';
import Button from '@enact/sandstone/Button';

const VideoStreamingPanel = (props) => {
  const [cart, setCart] = useState([]);  // 장바구니 상태 관리
  const { data, ...rest } = props;
  const { setPanelData } = useContext(PanelContext);
  const video = data?.video; // Video data 가져오기
  if (!video) return null;

  // 장바구니에 재료 추가/삭제
  const handleAddToCart = (ingredient) => {
    if (cart.includes(ingredient)) {
      setCart(prevCart => prevCart.filter(item => item !== ingredient));
    } else {
      setCart(prevCart => [...prevCart, ingredient]);
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
      { name: 'search', data: { query: data.video.foodName } }  // 'searchView'로 페이지 이동
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
    <Panel {...rest} noCloseButton={true} style={{ height: '100%', overflow: 'auto' }}>
      <Header
        title={`Video`}
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
          <Item onClick={handleFoodNameClick}>
            {data.video.foodName}
          </Item>
          {/* 부가정보를 Item 컴포넌트에 넣기 */}
          {ingredients.map((ingredient, index) => (
            <Layout key={index} align="center start" style={{ padding: '10px' }}>
              <Cell>
                <Item onClick={() => handleIngredientClick(ingredient)}>
                  {ingredient}
                </Item>
              </Cell>
              <Cell>
                <Button
                  onClick={() => handleAddToCart(ingredient)} 
                  style={{ marginLeft: '10px', backgroundColor: cart.includes(ingredient) ? 'green' : '' }}
                >
                  {cart.includes(ingredient) ? '장바구니에서 삭제' : '장바구니에 추가'}
                </Button>
              </Cell>
            </Layout>
          ))}
        </Page>
      </PageViews>
    </Panel>
  );
};

export default VideoStreamingPanel;
