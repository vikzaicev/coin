import styles from './styles.module.css'
import { Typography, Tag } from 'antd';
import { CoinInfo } from '../CoinInfo/CoinInfo';

export const ModaContent = ({ coin }) => {

    return (
        <>
            <CoinInfo coin={coin} Wr />
            <div className={styles.flex}>
                <Typography className={styles.title}>1 hour <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag> </Typography >
                <Typography className={styles.title}>1 day <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag> </Typography >
                <Typography className={styles.title}>1 week <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag> </Typography >
            </div >
            <Typography className={styles.text}>Price: {(coin.price).toFixed(2)}$</Typography >
            <Typography className={styles.text}>priceBtc: {coin.priceBtc}Btc</Typography >
            <Typography className={styles.text}>marketCap: {(coin.marketCap).toFixed(2)}$</Typography >
        </>
    )
}