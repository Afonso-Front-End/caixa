import React, { useEffect, useState } from 'react';
import useAcesso from './Acesso';
import { Route, Routes, Link } from 'react-router-dom';
import Tauri from '../../Tauri';

import "./container.css"
import "./menu.css"

import Produtos from '../produtos/lista_produtos/Produtos';
import CadastroProdutos from '../produtos/cadastro_produtos/Cadastro';
import Pdv from '../pdv/Pdv';
import Vendas from '../venda/Venda';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  useAcesso();


  const navigate = useNavigate();
  const [select, setSelect] = useState(() => {
    const storedValue = localStorage.getItem('selectedItem');
    return storedValue ? parseInt(storedValue, 10) : 0;
  });
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/produtos') {
      setSelect(0);
    } else if (currentPath === '/cadastrar-produtos') {
      setSelect(1);
    }
  }, []);
  const handleItemClick = (index, to) => {
    setSelect(index); 
    localStorage.setItem('selectedItem', index.toString());
  };

  return (

    <div className="container">
      <Tauri />
      <div className="content">
        <div className="left">
          <menu>
            <nav>
              <ul>
                <li className={select === 0 ? 'selected' : ''} onClick={() => handleItemClick(0)}><Link to="produtos">estoque <span></span></Link></li>
                <li className={select === 1 ? 'selected' : ''} onClick={() => handleItemClick(1)}><Link to="cadastrar-produtos">produtos <span></span></Link></li>
                <li className={select === 2 ? 'selected' : ''} onClick={() => handleItemClick(2)}><Link to="pdv">PDV <span></span></Link></li>
                <li className={select === 3 ? 'selected' : ''} onClick={() => handleItemClick(3)}><Link to="vendas">Historico de Vendas <span></span></Link></li>
                
              </ul>
            </nav>
          </menu>
        </div>

        <div className="rigth">
          <Routes>
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/cadastrar-produtos" element={<CadastroProdutos />} />
            <Route path="/pdv" element={<Pdv />} />
            <Route path="/vendas" element={<Vendas />} />
            
          </Routes>
        </div>
      </div>
    </div>


  );
};

export default Home;
