import styles from './styles.module.css';
import { Layout, Select, Space, Modal, Button, Drawer } from 'antd';
import { useContext, useState, useEffect } from 'react';
import { CriptoContext } from '../../../Context';
import { ModaContent } from '../ModalContent/ModalContent';
import { AddAsset } from '../AddAsset/AddAsset';

const { Header } = Layout;
const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    color: '#fff',
    height: 60,
    // backgroundColor: '#4096ff',
};

export const HeaderComp = () => {
    const { coinData } = useContext(CriptoContext);
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [coin, setCoin] = useState(null)
    const [drawer, setDrawer] = useState(false)

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
        setModal(true)
        setCoin(coinData.find(coin => coin.id === value));
        // console.log(`selected ${value}`);
    };

    const handleBTN = () => {
        setDrawer(true)
    }



    return (
        <Header style={headerStyle}>
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
            <Modal
                // title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={modal}
                onOk={() => setModal(false)}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <ModaContent coin={coin} />
            </Modal>
            <Button type="primary" onClick={handleBTN}>Add Asset</Button>
            <Drawer
                // title="Basic Drawer"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setDrawer(prev => !prev)}
                open={drawer}
            >
                <AddAsset />
            </Drawer>
        </Header >
    );
}