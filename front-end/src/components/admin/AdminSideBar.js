import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AdminSideBar.css';

const sideBarButtons = (text, dataTestId, route) => (
  <Link to={route} data-testid={dataTestId}>
    <button data-testid={dataTestId} type="button">
      {text}
    </button>
  </Link>
);
const AdminSideBar = () => (
  <div className="admin-side-bar-container">
    <div className="admin-side-bar-header">TryBeer</div>
    <div className="admin-side-bar-mid">
      {sideBarButtons('Pedidos', 'side-menu-item-orders', '/admin/orders')}
      {sideBarButtons('Perfil', 'side-menu-item-profile', '/admin/profile')}
      {sideBarButtons('Conversas', 'side-menu-item-chat', '/admin/chats')}
    </div>
    <div className="admin-side-bar-bot">
      {sideBarButtons('Sair', 'side-menu-item-logout', '/login')}
    </div>
  </div>
);

export default AdminSideBar;
