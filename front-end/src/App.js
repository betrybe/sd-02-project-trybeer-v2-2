import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminOrders from './pages/admin/Orders';
import AdminOrdersDetails from './pages/admin/OrderDetails'
import AdminProfile from './pages/admin/Profile';
import ClientProducts from './pages/client/Products';
import history from './services/history';
import Checkout from './pages/client/Checkout';
import TopMenu from './components/TopMenu';
import ClientSideBar from './components/client/ClientSideBar';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/client/Orders';
import OrdersDetails from './pages/client/OrderDetails';
import Profile from './pages/client/Profile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopMenu />
        <ClientSideBar />
        <Switch>
          <Route exact path="/admin/orders" component={AdminOrders} />
          <Route exact path="/admin/orders/:id" component={AdminOrdersDetails} />
          <Route exact path="/admin/profile" component={AdminProfile} />
          <Route exact path="/products" component={ClientProducts} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/orders" component={OrdersPage} />
          <Route exact path="/orders/:orderId" component={OrdersDetails} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/" render={() => history.push('/login')} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
