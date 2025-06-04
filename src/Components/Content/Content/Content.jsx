import styles from './styles.module.css';
import { Layout } from "antd";
import { useContext } from "react";
import { CriptoContext } from "../../../Context";
import { PieChart } from '../Chart/Chart';
import { AssetTable } from '../AssetTable/AssetTable';

export const ContentComp = () => {
    const { coinData, dataAssets } = useContext(CriptoContext);

    const criptoDataMap = coinData.reduce((acc, coin) => {
        acc[coin.id] = coin.price;
        return acc;
    }, {})

    const total = dataAssets.map(aset => aset.amount * criptoDataMap[aset.id]).reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const contentStyle = {
        textAlign: 'center',
        minHeight: 'calc(100vh - 60px)',
        color: '#fff',
        backgroundColor: '#001529',
        padding: '10px'
    };
    return (
        <Layout.Content style={contentStyle}>
            <div className={styles.title}>Portfolio:  {total}$</div>
            {dataAssets.length > 0 && <div className={styles.chart} >
                <PieChart />
            </div>}
            <AssetTable />
        </Layout.Content>
    );
}