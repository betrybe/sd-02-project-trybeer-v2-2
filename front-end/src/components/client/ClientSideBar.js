import React, { useContext } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { TrybeerContext } from '../../context/TrybeerContext';
import history from '../../services/history';
import checkLogin from '../../services/checkLogin';

import '../../styles/ClientSideBar.css';

const redirectButton = (setShowSideMenu, route) => {
  setShowSideMenu(false);
  if (route === '/login') localStorage.removeItem('user');
  // history.push(route);
};

// const newChat = async () => {
//   const token = checkLogin();
//   return axios({
//     baseURL: 'http://localhost:3001/users/chat/connect',
//     method: 'post',
//     headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: token },
//   }).catch((e) => new Error(e.message, e.status));
// };

const SideBar = () => {
  const { sideMenu: [showSideMenu, setShowSideMenu] } = useContext(TrybeerContext);
  return (!showSideMenu) || (
    <div className="side-menu-container">
      <div className="side-menu-top-container">
        <Link to="/products">
          <button
            type="button"
            data-testid="side-menu-item-products"
            onClick={() => redirectButton(setShowSideMenu, '/products')}
          >
            Produtos
          </button>
        </Link>
        <Link to="/orders">
          <button
            type="button"
            data-testid="side-menu-item-my-orders"
            onClick={() => redirectButton(setShowSideMenu, '/orders')}
          >
            Meus Pedidos
          </button>
        </Link>
        <Link to="/profile">
          <button
            type="button"
            data-testid="side-menu-item-my-profile"
            onClick={() => redirectButton(setShowSideMenu, '/profile')}
          >
            Meu Perfil
          </button>
        </Link>
        <Link className="button" to="/clientChat">
          <button
            type="button"
            data-testid="side-menu-item-chat-with-store"
            onClick={() => redirectButton(setShowSideMenu, '/chat')}
          >
            Conversar com a loja
          </button>
        </Link>
      </div>
      <div className="side-menu-bot-container">
        <Link to="login">
          <button
            type="button"
            data-testid="side-menu-item-logout"
            onClick={() => redirectButton(setShowSideMenu, '/login')}
          >
            Sair
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
