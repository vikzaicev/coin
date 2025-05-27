
import './App.css'
import { AppLayout } from './Components/AppLayout';
import { CriptoContextProvider } from './Context';


function App() {

  return (
    <CriptoContextProvider>
      <AppLayout />
    </CriptoContextProvider>
  )
}

export default App
