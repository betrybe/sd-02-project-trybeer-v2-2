import React, { useContext } from 'react';
import axios from 'axios';
import { TrybeerContext } from '../../context/TrybeerContext';
import history from '../../services/history';
import checkLogin from '../../services/checkLogin';

import '../../styles/ClientSideBar.css';

const redirectButton = (setShowSideMenu, route) => {
  setShowSideMenu(false);
  if (route === '/login') localStorage.removeItem('user');
  history.push(`${route}`);
};

const newChat = async () => {
  const token = checkLogin();
  await axios({
    baseURL: 'http://localhost:3001/users/chat/connect',
    method: 'post',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: token },
  });
};

const SideBar = () => {
  const { sideMenu: [showSideMenu, setShowSideMenu] } = useContext(TrybeerContext);
  return (!showSideMenu) || (
    <div className="side-menu-container">
      <div className="side-menu-top-container">
        <button
          type="button"
          data-testid="side-menu-item-products"
          onClick={() => redirectButton(setShowSideMenu, '/products')}
        >
          Produtos
        </button>
        <button
          type="button"
          data-testid="side-menu-item-my-orders"
          onClick={() => redirectButton(setShowSideMenu, '/orders')}
        >
          Meus Pedidos
        </button>
        <button
          type="button"
          data-testid="side-menu-item-my-profile"
          onClick={() => redirectButton(setShowSideMenu, '/profile')}
        >
          Meu Perfil
        </button>
        <button
          type="button"
          data-testid="side-menu-item-chat-with-store"
          onClick={() => newChat(setShowSideMenu, '/chat')}
        >
          Conversar com a loja
        </button>
      </div>
      <div className="side-menu-bot-container">
        <button
          type="button"
          data-testid="side-menu-item-logout"
          onClick={() => redirectButton(setShowSideMenu, '/login')}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default SideBar;
