import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import history from '../services/history';
import Login from '../pages/Login';
import axios from 'axios';

const usersMock = {
  data: {
    email: 'trybe@email.com',
    name: 'Tryber Tryber',
    role: 'client',
    token: '123456',
  }
};

const usersAdminMock = {
  data: {
    email: 'lipe@lipe.com',
    name: 'Lipe Tryber',
    role: 'administrator',
    token: '123456',
  }
};

const dataError = {
  response: {
    status: 401,
    data: {
      error: {
        message: 'Error: 401. E-mail not found.'
      },
    },
  },
};

jest.mock('axios');
// jest.mock(loginRedirect);

beforeEach(() => localStorage.clear());

describe('Testing Login Page', () => {
  test('Testing if HTML elements appears', () => {
    const { queryByTestId } = render(
      <Login />
    );
    const emailInput = queryByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passInput = queryByTestId('password-input');
    expect(passInput).toBeInTheDocument();
    const signInButton = queryByTestId('signin-btn');
    expect(signInButton).toBeInTheDocument();
    const noAccountButton = queryByTestId('no-account-btn');
    expect(noAccountButton).toBeInTheDocument();
  });

  test('Testing funcionality of HTML elements', () => {
    const { queryByTestId } = render(
      <Login />
    );
    
    const emailInput = queryByTestId('email-input');
    const passInput = queryByTestId('password-input');
    const signInButton = queryByTestId('signin-btn');

    expect(emailInput.value).toBe('');
    expect(passInput.value).toBe('');
    expect(signInButton.disabled).toBeTruthy();
    fireEvent.change(emailInput, { target: { value: 'trybe@.email.com' } });
    expect(emailInput.value).toBe('trybe@.email.com');
    expect(signInButton.disabled).toBeTruthy();
    fireEvent.change(passInput, { target: { value: '12345' } });
    expect(passInput.value).toBe('12345');
    expect(signInButton.disabled).toBeTruthy();
    fireEvent.change(emailInput, { target: { value: 'trybe@email.com' } });
    fireEvent.change(passInput, { target: { value: '123456' } });
    expect(emailInput.value).toBe('trybe@email.com');
    expect(passInput.value).toBe('123456');
    expect(signInButton.disabled).toBeFalsy();
  });

  test('Testing new user button', async () => {
    const { queryByTestId } = render(
      <Router history={history}>
        <Login />
      </Router>
    );
    
    const noAccountButton = queryByTestId('no-account-btn');
    fireEvent.click(noAccountButton);
    expect(history.location.pathname).toBe('/register');
  });

  test('Testing login button with client user', async () => {
    const {queryByTestId} = render(
      <Login />
    );

    const emailInput = queryByTestId('email-input');
    const passInput = queryByTestId('password-input');
    const signInButton = queryByTestId('signin-btn');

    fireEvent.change(emailInput, { target: { value: 'trybe@email.com' } });
    fireEvent.change(passInput, { target: { value: '123456' } });
    axios.mockImplementationOnce(() => Promise.resolve(usersMock));
    fireEvent.click(signInButton);
    await wait();
    expect(history.location.pathname).toBe('/products');
  });

  test('Testing axios catch in login button', async () => {
    const { queryByTestId, getByText } = render(
      <Login />
    );

    const emailInput = queryByTestId('email-input');
    const passInput = queryByTestId('password-input');
    const signInButton = queryByTestId('signin-btn');

    fireEvent.change(emailInput, { target: { value: 'lipe@lipe.com' } });
    fireEvent.change(passInput, { target: { value: '123456' } });
    axios.mockImplementationOnce(() => Promise.reject(dataError));
    fireEvent.click(signInButton);
    await wait();
    expect(getByText(/Error: 401. E-mail not found./i, { selector: 'div' })).toBeInTheDocument();
  });

  test('Testing login button with administrator user', async () => {
    const {queryByTestId} = render(
      <Login />
    );

    const emailInput = queryByTestId('email-input');
    const passInput = queryByTestId('password-input');
    const signInButton = queryByTestId('signin-btn');

    fireEvent.change(emailInput, { target: { value: 'lipe@lipe.com' } });
    fireEvent.change(passInput, { target: { value: '123456' } });
    axios.mockImplementationOnce(() => Promise.resolve(usersAdminMock));
    fireEvent.click(signInButton);
    await wait();
    expect(history.location.pathname).toBe('/admin/orders');
  });
});
