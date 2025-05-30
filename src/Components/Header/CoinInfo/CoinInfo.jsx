import styles from './styles.module.css';

export const CoinInfo = ({ coin, Wr }) => {

    return (
        <div className={styles.flex}>
            <img src={coin.icon} style={{ width: '25px', marginRight: '20px' }} alt={coin.id}></img>
            <div className={styles.name}>{Wr && <span>({coin.symbol})</span>} {coin.name}</div>
        </div>
    )
}