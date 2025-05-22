import styles from './styles.module.css';
import { Layout } from 'antd';

const { Header } = Layout;
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 60,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

export const HeaderComp = () => {
    return (
        <Header style={headerStyle}>lkjh</Header>
    );
}