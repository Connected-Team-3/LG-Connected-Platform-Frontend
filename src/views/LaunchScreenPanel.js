import React from 'react';
import { Panel } from '@enact/sandstone/Panels';
import { Row, Cell } from '@enact/ui/Layout';
import styles from './LaunchScreenPanel.module.less';
import logo from './logo.png';


export default function LaunchScreen() {
    return (
        <Panel className={styles.launchContainer} noCloseButton>
            {/* 로고와 텍스트를 가로로 배치 */}
            <Row align="center" justify="center" className={styles.logoRow} style={{ height: '100%' }}>
                <Cell
                    align="center"
                    justify="center"
                    className={styles.contentCell}
                >
                    {/* 로고 */}
                    <img src={logo} alt="Logo" className={styles.logo} />
                    {/* 브랜드 이름 */}
                    <h1 className={styles.brandName}>오늘 뭐 먹지?</h1>
                </Cell>
            </Row>
        </Panel>
    );
}
