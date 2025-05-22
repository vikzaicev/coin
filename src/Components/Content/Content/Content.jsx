import { Layout } from "antd";

export const ContentComp = () => {
    const contentStyle = {
        textAlign: 'center',
        minHeight: 'calc(100vh - 60px)',
        color: '#fff',
        backgroundColor: '#001529',
    };
    return (
        <Layout.Content style={contentStyle}>Content</Layout.Content>
    );
}