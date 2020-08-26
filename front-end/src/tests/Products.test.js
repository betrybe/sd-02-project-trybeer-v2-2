import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import history from '../services/history';
import ClientProducts from '../pages/client/Products';
import axios from 'axios';
import Provider from '../context/TrybeerContext';

const usersMock = {
  email: 'jctaraujo@hotmail.com',
  name: 'Julio Cezar',
  role: 'client',
  token: '12345677',
};

const usersMockWithoutToken = {
  email: 'jctaraujo@hotmail.com',
  name: 'Julio Cezar',
  role: 'client',
}

const dataSuccess = {
  data: [
    {
      id: 1,
      name: "Skol Lata 250ml",
      price: 2.2,
      urlImage: "http://localhost:3001/images/Skol Lata 350ml.jpg",
    },
    {
      id: 2,
      name: "Heineken 600ml",
      price: 7.5,
      urlImage: "http://localhost:3001/images/Heineken 600ml.jpg",
    },
    {
      id: 3,
      name: "Antarctica Pilsen 300ml",
      price: 2.49,
      urlImage: "http://localhost:3001/images/Antarctica Pilsen 300ml.jpg",
    },
  ],
};

const dataError = {
  response: {
    status: 404,
    data: {
      error: {
        message: 'expired'
      },
    },
  },
};

jest.mock('axios');

beforeEach(() => localStorage.clear());

describe('Products page tests', () => {
  test('if page products are loading correctly', async () => {
    localStorage.setItem('user', JSON.stringify(usersMock));
    history.push('/products');
    axios.mockResolvedValue(dataSuccess);
    const { findByTestId } = render(
      <Provider>
        <ClientProducts />
      </Provider>
    );
    expect(history.location.pathname).toBe('/products');
    await findByTestId("checkout-bottom-btn");
    await wait();
  });
  test('if rediret to /login when user is null', async () => {
    // localStorage.setItem('user', JSON.stringify(usersMock));
    history.push('/products');
    axios.mockResolvedValue(dataSuccess);
    const { findByTestId } = render(
      <Provider>
        <ClientProducts />
      </Provider>
    );
    await wait()
    expect(history.location.pathname).toBe('/login');
  });
  test('if api return error', async () => {
    localStorage.setItem('user', JSON.stringify(usersMock));
    history.push('/products');
    axios.mockRejectedValue(dataError);
    const { queryByText } = render(
      <Provider>
        <ClientProducts />
      </Provider>
    );
    expect(history.location.pathname).toBe('/products');
    await wait();
    expect(queryByText(/expired/i)).toBeInTheDocument();
  });
  test('if api is offline', async () => {
    localStorage.setItem('user', JSON.stringify(usersMock));
    history.push('/products');
    axios.mockResolvedValue(null);
    const { queryByText } = render(
      <Provider>
        <ClientProducts />
      </Provider>
    );
    expect(history.location.pathname).toBe('/products');
    await wait();
    expect(queryByText(/Falha na conexão com o banco/i)).toBeInTheDocument();
  });
});
