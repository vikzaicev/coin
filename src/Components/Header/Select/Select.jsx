import { Select, Space } from 'antd';
import { useContext, useState, useEffect } from 'react';
import { CriptoContext } from '../../../Context';

export const SelectComp = ({ }) => {

    const { coinData } = useContext(CriptoContext);
    const [select, setSelect] = useState(false)

    useEffect(() => {
        const keypress = (e) => {
            if (e.key === '/') {
                setSelect((prev) => !prev);
            }
        };
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    const handleChange = value => {

        setCoin(coinData.find(coin => coin.id === value));

    };

    return (
        <Select
            style={{ width: '250px' }}
            value="press / to open"
            open={select}
            onChange={handleChange}
            onClick={() => setSelect((prev) => !prev)}
            options={coinData.map(coin => ({
                label: coin.name,
                value: coin.id,
                img: coin.icon,
            }))}
            optionRender={(option) => (
                <Space>
                    <img src={option.data.img} style={{ width: '25px' }} alt={option.data.id}></img>{'  '}
                    {option.data.label}
                </Space>
            )}
        />
    )
}