import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Planos from './pages/Planos/Planos';
import Login from './pages/Login/Login';
import Rodape from './components/Rodape/Rodape';
import FaleConosco from './pages/FaleConosco/FaleConosco';
import Treinos from './pages/Treinos/Treinos';
import Usuarios from './pages/Usuarios/Usuarios'
import Pagamento from './pages/Pagamento/Pagamento';
import PagamentoLista from './pages/PagamentoLista/PagamentoLista';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='h-80vh'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/faleconosco" element={<FaleConosco />} />
          <Route path="/login" element={<Login />} />
          <Route path="/treinos" element={<Treinos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/pagamentolista" element={<PagamentoLista />} />
        </Routes>
      </div>
      <div className='footer'>
        <Rodape />
      </div>
    </BrowserRouter>
  );
}
