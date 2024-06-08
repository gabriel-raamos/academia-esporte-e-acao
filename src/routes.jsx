import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
// import PaginaPadrao from './components/PaginaPadrao/PaginaPadrao'
import Home from './pages/Home/Home'
import Planos from './pages/Planos/Planos'
import Login from './pages/Login/Login'
import Rodape from './components/Rodape/Rodape'
import FaleConosco from './pages/FaleConosco/FaleConosco'
// import Dashboard from './pages/Dashboard/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div className='app-container' >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/faleconosco" element={<FaleConosco />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        </Routes>
      </div>

      <div className='footer' >
        <Rodape />
      </div>

    </BrowserRouter>
  )
}
