import React from 'react';
import { Panel } from '@enact/sandstone/Panels';
import { Row, Cell } from '@enact/ui/Layout';
import styles from './LaunchScreenPanel.module.less';

export default function LaunchScreen() {
    return (
        <Panel className={styles.launchContainer} noCloseButton>
            {/* 로고와 텍스트를 가로로 배치 */}
            <Row align="center" justify="center" className={styles.logoRow} style={{ height: '100%' }}>
                <Cell align="center" justify="center" style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* 로고 */}
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/93f7efe13da1daed926e5d048f95e29b6583dc53831f53f74ccaf9cf56644899?placeholderIfAbsent=true&apiKey=68035fc5507446048b491a35ea37fa3b"
                        alt="FoodHub brand logo"
                        className={styles.brandLogo}
                    />
                    {/* 브랜드 이름 */}
                    <h1 className={styles.brandName}>FoodHub</h1>
                </Cell>
            </Row>
        </Panel>
    );
}
