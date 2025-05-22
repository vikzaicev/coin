
import './App.css'
import { Layout } from 'antd';
import { HeaderComp } from './Components/Header/Header/Header';
import { SiderComp } from './Components/Sider/Sider/Sider';
import { ContentComp } from './Components/Content/Content/Content';



function App() {


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

export default App
