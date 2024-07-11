import axios from "axios";
import NavButton from "../NavButton/NavButton";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authHeader = localStorage.getItem('authorization');

  const fetchName = async () => {
    try {
      const response = await axios.get("https://academia-esporte-e-acao.vercel.app/api/cliente/findbyid/");
      const name = response.data.name;
      const role1 = response.data.role;

      setName(name);
      setRole(role1);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('https://academia-esporte-e-acao.vercel.app/api/cliente/logout');
      localStorage.removeItem('authorization');
      localStorage.removeItem('json-data');
      window.location.href = '/';
    } catch (error) {
      alert('Error: ', error);
    }
  };

  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  function sliceName(name) {
    if (name.length >= 10) {
      return name.slice(0, 10) + '...';
    } else {
      return name
    }
  }

  useEffect(() => {
    if (authHeader) {
      fetchName();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [authHeader]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="content-between flex justify-center items-center bg-gray-900 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
      <nav className="grid grid-cols-5 -space-x-3 md:space-x-5 items-center mb-5 md:my-5 pl-5 md:pl-0">
        <div className="pl-2 md:pl-0 flex justify-center">
          <NavButton title="Início" link="" />
        </div>

        <div className="pl-2 md:pl-0 flex justify-center">
          <NavButton title="Planos" link="planos" />
        </div>

        <div className="pl-3 md:pl-0 flex justify-center">
          <NavButton title="Contato" link="contato" />
        </div>

        {!authHeader ? (
          <div className="flex justify-center items-center h-2/3 w-2/3 pl-8 md:pl-0">
            <button
              className="text-white text-sm md:text-xl p-2 mt-7 md:mt-0 rounded-3xl font-bold transition duration-500 hover:bg-blue-700 focus:bg-blue-700"
              disabled
            >
              Treinos
            </button>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center pl-3 md:pl-0">
              <button className="text-white absolute text-sm md:text-xl p-2 mt-7 md:mt-0 rounded-3xl font-bold transition duration-500 hover:bg-blue-700 hover:text-white focus:bg-blue-700">
                Carregando
              </button>
            </div>
          </div>
        ) : error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : (
          <div ref={menuRef}>
            {role === 'admin' ? (
              <div className="relative flex justify-center">
                <button
                  onClick={toggleMenu}
                  className="select-none text-white bg-gray-900 text-sm md:text-xl p-2 mt-7 md:mt-0 rounded-3xl font-bold transition duration-500 hover:bg-blue-700 hover:text-white focus:bg-blue-700"
                >
                  {sliceName(name)}
                </button>
                {isMenuOpen && (
                  <ul
                    className="absolute translate-y-12 z-10 w-48 mt-2 py-2 rounded-md font-bold text-xl shadow-lg origin-top-right right-0 transition duration-300 bg-gray-500 transform scale-100 opacity-100"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <Link to="treinos" onClick={handleMenuItemClick}>
                      <li
                        className="block px-4 py-2 text-sm text-white bg-gray-900 hover:bg-gray-700 duration-500 transition"
                        role="menuitem"
                      >
                        Treinos
                      </li>
                    </Link>

                    <Link to="usuarios" onClick={handleMenuItemClick}>
                      <li
                        className="block px-4 py-2 text-sm text-white bg-gray-900 hover:bg-gray-700 duration-500 transition"
                        role="menuitem"
                      >
                        Usuários
                      </li>
                    </Link>

                    <Link to="pagamentolista" onClick={handleMenuItemClick}>
                      <li
                        className="block px-4 py-2 text-sm text-white bg-gray-900 hover:bg-gray-700 duration-500 transition"
                        role="menuitem"
                      >
                        Pagamentos
                      </li>
                    </Link>
                  </ul>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center pl-6 md:pl-0">
                <NavButton title={sliceName(name)} link="treinos" />
              </div>
            )}
          </div>
        )}

        {!authHeader && (
          <div className="pl-3 md:pl-0 justify-center">
            <NavButton title="Entrar" link="login" />
          </div>
        )}

        {authHeader && (
          <div className="flex justify-center items-center w-2/3 md:w-1/3">
            <button
              onClick={logout}
              className="text-white text-sm md:text-xl p-2 mt-7 md:mt-0 rounded-3xl font-bold transition hover:bg-blue-700 focus:bg-blue-700 hover:white duration-500"
            >
              Sair
            </button>
          </div>
        )}
      </nav>
    </section>
  );
}
