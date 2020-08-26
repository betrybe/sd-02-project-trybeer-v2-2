import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import history from '../services/history';
import Provider from '../context/TrybeerContext';
import TopMenu from '../components/TopMenu';
import ClientSideBar from '../components/client/ClientSideBar';

describe('testing top menu dont display', () => {
  test('if top menu dont display at route /login', () => {
    history.push('/login');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
        </Provider>
      </Router>
    );
    expect(queryByTestId("top-title")).toBeNull();
  });
  test('if top menu dont display at route /register', () => {
    history.push('/register');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
        </Provider>
      </Router>
    );
    expect(queryByTestId("top-title")).toBeNull();
  });
  test('if top menu dont display at route /admin/profile', () => {
    history.push('/admin/profile');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
        </Provider>
      </Router>
    );
    expect(queryByTestId("top-title")).toBeNull();
  });
  test('if top menu dont display at route /admin/orders', () => {
    history.push('/admin/orders');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
        </Provider>
      </Router>
    );
    expect(queryByTestId("top-title")).toBeNull();
  });
});

describe('if top menu display', () => {
  test('if display at /products', () => {
    history.push('/products');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
        </Provider>
      </Router>
    );
    expect(queryByTestId("top-title")).toBeInTheDocument();
    expect(queryByTestId("top-title").innerHTML).toBe('TryBeer');
  });
  test('if display at /orders', () => {
    history.push('/orders');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
        </Provider>
      </Router>
    );
    expect(queryByTestId("top-title")).toBeInTheDocument();
    expect(queryByTestId("top-title").innerHTML).toBe('Meus Pedidos');
  });
  test('if display at /orders/:orderId', () => {
    history.push('/orders/1');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
        </Provider>
      </Router>
    );
    expect(queryByTestId("top-title")).toBeInTheDocument();
    expect(queryByTestId("top-title").innerHTML).toBe('Detalhes de Pedido');
  });
  test('if display at /profile', () => {
    history.push('/profile');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
        </Provider>
      </Router>
    );
    expect(queryByTestId("top-title")).toBeInTheDocument();
    expect(queryByTestId("top-title").innerHTML).toBe('Meu perfil');
  });
  test('if display at /checkout', () => {
    history.push('/checkout');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
        </Provider>
      </Router>
    );
    expect(queryByTestId("top-title")).toBeInTheDocument();
    expect(queryByTestId("top-title").innerHTML).toBe('Finalizar Pedido');
  });
});

describe('display side bar after click hamburguer menu', () => {
  test('if side bar display correctly', () => {
    history.push('/products');
    const { queryByTestId } = render(
      <Router history={history}>
        <Provider>
          <TopMenu />
          <ClientSideBar />
        </Provider>
      </Router>
    );
    const hamburguerButton = queryByTestId('top-hamburguer');
    fireEvent.click(hamburguerButton);
    expect(queryByTestId('side-menu-item-products')).toBeInTheDocument();
    expect(queryByTestId('side-menu-item-my-orders')).toBeInTheDocument();
    expect(queryByTestId('side-menu-item-my-profile')).toBeInTheDocument();
    expect(queryByTestId('side-menu-item-logout')).toBeInTheDocument();
  });
});
