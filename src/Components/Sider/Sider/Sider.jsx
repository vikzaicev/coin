import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import { fetchCoinData } from '../../../API';
import { useEffect, useState } from 'react';
import { criptoAssets } from '../../../API';
import { persentDifference, toUpperCase } from '../../../utils';

export const SiderComp = () => {

    const [loading, setLoading] = useState(false);
    const [dataAssets, setDataAssets] = useState(criptoAssets);
    const [coinData, setCoinData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetchCoinData();
                setCoinData(data.result);
                setDataAssets(
                    dataAssets.map(asset => {
                        const coin = data.result.find(coin => coin.id === asset.id);

                        return {
                            grow: asset.price < coin.price,
                            growPersent: persentDifference(asset.price, coin.price),
                            totalAmount: asset.amount * coin.price,
                            totalPrice: asset.amount * coin.price - asset.amount * asset.price,
                            ...asset,
                        };
                    }
                    )
                )
                setLoading(false)
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        };
        fetchData();
    }, []);

    const siderStyle = {
        textAlign: 'start',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#1677ff',
        padding: '10px',
    };

    return (
        <>
            {loading && <Spin size="large" fullscreen />}
            {!loading && <Layout.Sider width="25%" style={siderStyle}>
                {dataAssets.map(aset => {
                    return (
                        <Card className={styles.card} key={aset.id}>
                            <Statistic
                                title={toUpperCase(aset.id)}
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
            </Layout.Sider>}</>
    );
}