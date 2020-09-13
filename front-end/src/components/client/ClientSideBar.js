import React, { useContext } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TrybeerContext } from '../../context/TrybeerContext';
// import checkLogin from '../../services/checkLogin';

import '../../styles/ClientSideBar.css';

const redirectButton = (setShowSideMenu, route) => {
  setShowSideMenu(false);
  if (route === '/login') localStorage.removeItem('user');
};

const LinkToProducts = ({ linkRoute, dataTest, text }) => {
  const { sideMenu: [, setShowSideMenu] } = useContext(TrybeerContext);
  return (
    <Link to={linkRoute}>
      <button
        type="button"
        data-testid={dataTest}
        onClick={() => redirectButton(setShowSideMenu, linkRoute)}
      >
        {text}
      </button>
    </Link>
  );
};

const SideBar = () => {
  const { sideMenu: [showSideMenu, _] } = useContext(TrybeerContext);
  return (!showSideMenu) || (
    <div className="side-menu-container">
      <div className="side-menu-top-container">
        <LinkToProducts linkRoute="/products" dataTest="side-menu-item-products" text="Produtos" />
        <LinkToProducts linkRoute="/orders" dataTest="side-menu-item-my-orders" text="Meus Pedidos" />
        <LinkToProducts linkRoute="/profile" dataTest="side-menu-item-my-profile" text="Meu Perfil" />
        <LinkToProducts linkRoute="/clientChat" dataTest="side-menu-item-chat-with-store" text="Conversar com a Loja" />
      </div>
      <div className="side-menu-bot-container">
        <LinkToProducts linkRoute="/login" dataTest="side-menu-item-logout" text="Sair" />
      </div>
    </div>
  );
};

export default SideBar;

LinkToProducts.propTypes = {
  linkRoute: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
