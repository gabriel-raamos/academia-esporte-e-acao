import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
// import PaginaPadrao from './components/PaginaPadrao/PaginaPadrao'
import Home from './pages/Home/Home'
import Planos from './pages/Planos/Planos'
import Login from './pages/Login/Login'
import Rodape from './components/Rodape/Rodape'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <div className="min-height-83">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      <Rodape />

    </BrowserRouter>
  )
}

{/* <Route index element={<Home />} />
<Route path=":planos" element={<Planos />} />
<Route path=":login" element={<Login />} /> */}
