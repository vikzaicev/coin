import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import { toUpperCase } from '../../../utils';
import { useContext } from 'react';
import { CriptoContext } from '../../../Context';

export const SiderComp = () => {
    const { dataAssets } = useContext(CriptoContext);

    const siderStyle = {
        textAlign: 'start',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#001529',
        padding: '10px',
    };

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {dataAssets.map(aset => {
                return (
                    <Card className={styles.card} key={aset.id}>
                        <Statistic
                            title={`(${aset.symbol}) ${(toUpperCase(aset.id))}`}
                            value={aset.totalAmount}
                            precision={2}
                            valueStyle={{ color: aset.grow ? '#3f8600' : '#cf1322' }}
                            prefix={aset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            suffix="$"
                        />
                        <List
                            size='smoll'
                            dataSource={[
                                { title: 'Total Profit', value: (aset.totalAmount), withTag: true },
                                { title: 'Asset Amount', value: aset.amount, isPlain: true },
                                // { title: 'Difference', value: aset.growPersent }
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <span >{item.title}:</span>
                                    {item.withTag && <Tag color={aset.grow ? 'green' : 'red'}>{aset.growPersent}</Tag>}
                                    <span >{item.isPlain && (+item.value).toFixed(2)}
                                        {!item.isPlain && <Typography.Text type={aset.grow ? 'success' : 'danger'}>
                                            {(+item.value).toFixed(2) + '$'}
                                        </Typography.Text>}
                                    </span>
                                </List.Item>
                            )}
                        />
                    </Card>
                )
            })}
        </Layout.Sider>
    );
}