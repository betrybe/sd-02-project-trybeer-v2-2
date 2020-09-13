import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../services/history';
import '../../styles/AdminSideBar.css';

const redirectPage = (route) => history.push(route);

const sideBarButtons = (text, dataTestId, route) => (
  <Link to={route}>
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
      {sideBarButtons('Conversas', 'side-menu-item-chat', '/adminChat')}
    </div>
    <div className="admin-side-bar-bot">
      {sideBarButtons('Sair', 'side-menu-item-logout', '/login')}
    </div>
  </div>
);

export default AdminSideBar;
