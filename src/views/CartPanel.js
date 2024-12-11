import { Header, Panel } from '@enact/sandstone/Panels';
import { useEffect, useState } from 'react';
import axiosInstance from '../auth/axiosInstance';
import Item from '@enact/sandstone/Item';
import Button from '@enact/sandstone/Button';
import alert from '@enact/sandstone/Alert'

import css from './CartPanel.module.less';

const CartPanel = (props) => {
  const { ...rest } = props;
  const [cartItems, setCartItems] = useState([]); // 장바구니 상태

  // 장바구니 데이터 불러오기
  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await axiosInstance.get('/api/cart');
        console.log('Cart API Response:', response.data); // 응답 데이터 확인
        const itemsObject = response.data.result.data.items; // 응답 경로 수정
  
        if (itemsObject && typeof itemsObject === 'object') {
          // 객체를 배열로 변환
          const itemsArray = Object.entries(itemsObject).map(([name, quantity]) => ({
            name,
            quantity,
          }));
          setCartItems(itemsArray); // 배열로 상태 설정
        } else {
          console.error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);

  // 장바구니 비우기
  const handleClearCart = async () => {
    try {
      const response = await axiosInstance.delete('/api/cart/clear');
      if (response.status === 200) {
        setCartItems([]); // UI에서 즉시 반영
        alert('장바구니를 비웠습니다.');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('장바구니를 비우는 데 실패했습니다.');
    }
  };

  return (
    <Panel {...rest} className={css.cartPanel} noCloseButton={true}>
      <Header
        title={<span className={css.customTitle}>장바구니</span>}
    />
    <Button
        className={css.clearCartButton}
        onClick={handleClearCart}
        size="small"
        backgroundOpacity="transparent"
    >
        비우기
    </Button>
      <div style={{ padding: '10px', color:'#000'}}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <Item key={index}>
              {item.name} - 수량: {item.quantity}
            </Item>
          ))
        ) : (
          <p style={{color:'#000'}}>장바구니가 비어 있습니다.</p>
        )}
      </div>
    </Panel>
  );
};

export default CartPanel;
