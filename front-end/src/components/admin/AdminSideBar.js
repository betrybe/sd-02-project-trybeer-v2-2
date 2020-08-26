import React from 'react';
import history from '../../services/history';
import '../../styles/AdminSideBar.css';

const redirectPage = (route) => history.push(route);

const sideBarButtons = (text, dataTestId, route) => {
  // if (route === '/login') localStorage.removeItem('user');
  return (
    <button data-testid={dataTestId} type='button' onClick={() => redirectPage(route)}>
      {text}
    </button>
  )
};


const AdminSideBar = () => {
  return (
    <div className="admin-side-bar-container">
      <div className="admin-side-bar-header">TryBeer</div>
      <div className="admin-side-bar-mid">
        {sideBarButtons('Pedidos', 'side-menu-item-orders', '/admin/orders')}
        {sideBarButtons('Perfil', 'side-menu-item-profile', '/admin/profile')}
      </div>
      <div className="admin-side-bar-bot">
        {sideBarButtons('Sair', 'side-menu-item-logout', '/login')}
      </div>
    </div>
  );
};

export default AdminSideBar;
