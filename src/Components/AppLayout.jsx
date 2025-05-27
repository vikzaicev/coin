import { Layout, Spin } from 'antd';
import { HeaderComp } from './Header/Header/Header';
import { SiderComp } from './Sider/Sider/Sider';
import { ContentComp } from './Content/Content/Content';
import { CriptoContext } from '../Context';
import { useContext } from 'react';

export const AppLayout = () => {

    const { loading } = useContext(CriptoContext);

    if (loading) {
        return (
            <Spin size="large" fullscreen />
        )
    }

    return (
        <Layout >
            <HeaderComp />
            <Layout>
                <SiderComp />
                <ContentComp />
            </Layout>
        </Layout>
    )
}