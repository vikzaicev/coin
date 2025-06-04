import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useContext, useState } from "react";
import { CriptoContext } from "../../../Context";
import { Button, Typography } from "antd";
import styles from './styles.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);


export const PieChart = () => {
    const [option, setOption] = useState('amount')

    const { dataAssets } = useContext(CriptoContext);
    const nameAssets = dataAssets.map(asset => asset.id);
    const amountAssets = dataAssets.map(asset => option === 'amount' ? asset.amount : asset.totalAmount);

    const handleClickBTN = () => {
        if (option === 'amount') {
            setOption('price');
        } else {
            setOption('amount');
        }
    }

    const data = {
        labels: nameAssets,
        datasets: [
            {
                label: option,
                data: amountAssets,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
            },
        ],
    };

    return (
        <div className={styles.chart}>
            <Typography className={styles.text}  >{option === 'amount' ? 'Amount' : 'Total price'}</Typography>
            <Pie data={data} className={styles.pie} />
            <Button type="primary" onClick={handleClickBTN}>{option === 'amount' ? 'Total price' : 'Amount'}</Button>
        </div>);
};