import styles from './styles.module.css';
import { Layout, Modal, Button, Drawer, Select, Space, Typography, } from 'antd';
import { useContext, useState, useEffect } from 'react';
import { CriptoContext } from '../../../Context';
import { ModaContent } from '../ModalContent/ModalContent';
import { AddNewAsset } from '../AddAsset/AddAsset';
import { DeleteAsset } from '../DeleteAsset/DeleteAsset';

const { Header } = Layout;
const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    color: '#fff',
    height: 60,
};

export const HeaderComp = () => {
    const { coinData } = useContext(CriptoContext);
    const [modal, setModal] = useState(false)
    const [coin, setCoin] = useState(null)
    const [drawer, setDrawer] = useState(false)
    const [drawer2, setDrawer2] = useState(false)
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
        setModal(true)
        setCoin(coinData.find(coin => coin.id === value));
        // setSelect(false);
    };

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
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={modal}
                onOk={() => setModal(false)}
                onCancel={() => setModal(false)}
                footer={null}
            >
                <ModaContent coin={coin} />
            </Modal>
            <div className="">
                <Button type="primary" style={{ marginRight: '25px' }} onClick={() => setDrawer2(true)}>Delete Asset</Button>
                <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
            </div>
            <Drawer
                title="Add Asset"
                size='large'
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setDrawer(prev => !prev)}
                open={drawer}
                destroyOnHidden={true}
            >
                <AddNewAsset onClose={() => setDrawer(false)} />
            </Drawer>
            <Drawer
                title="Delete Asset"
                size='default'
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => setDrawer2(prev => !prev)}
                open={drawer2}
                destroyOnHidden={true}
            >
                <DeleteAsset onClose={() => setDrawer2(false)} />
            </Drawer>
        </Header >
    );
}