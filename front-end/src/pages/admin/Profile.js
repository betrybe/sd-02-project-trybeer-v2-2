import React, { useEffect } from 'react';
import history from '../../services/history';
import '../../styles/AdminProfile.css';
import AdminSideBar from '../../components/admin/AdminSideBar';

export default function AdminProfile() {
  const isLoggedIn = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  useEffect(() => {
    // console.log(isLoggedIn);

    if (!isLoggedIn) history.push('/login')
  }, [isLoggedIn])
  if (!isLoggedIn) return null;
  const { name, email } = isLoggedIn;
  return (
    <div className="admin-profile-flex-container">
      <AdminSideBar />
      <div className="admin-profile-header">
        <h1>Perfil</h1>
        <div className="admin-name-field" data-testid="profile-name">
          {`Nome: ${name}`}
        </div>
        <div className="admin-email-field" data-testid="profile-email">
          {`Email: ${email}`}
        </div>
      </div>
      <div>
        <p data-testid="side-menu-item-orders" onClick={() => history.push('/admin/orders')}>Pedidos</p>
      </div>
      <div>
        <p data-testid="side-menu-item-profile" onClick={() => history.push('/admin/profile')}>Perfil</p>
      </div>
      <div>
        <p data-testid="side-menu-item-logout" onClick={() => history.push('/login')}>Sair</p>
      </div>
    </div>
  )
}
