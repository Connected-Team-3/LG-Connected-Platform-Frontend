import React from 'react';
import css from './HeaderMessage.module.less'; // 스타일 파일 import
import logo from './logo.png';

const HeaderMessage = ({ userName, logo }) => (
    <div >
        <img src={logo} alt="Logo" style={{ height:'100px', width:'100px' }}/>
        <div className={css.message}>
            {userName ? (
                <span style={{color: '#000'}}>{`${userName}님, 무슨 음식을 좋아하시나요?`}</span>
            ) : (
                <span>무슨 음식을 좋아하시나요?</span>
            )}
        </div>
    </div>
);

export default HeaderMessage;

