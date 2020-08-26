import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import history from '../services/history';
import { TrybeerContext } from '../context/TrybeerContext';
import CheckoutButton from '../components/CheckoutButton';
import useRefreshTotalPrice from '../hooks/useRefreshTotalPrice';

const totalQty = 10;

const storeMock = {
  shopCart: [totalQty],
};

jest.mock('../hooks/useRefreshTotalPrice');

describe('Test checkout button component', () => {
  useRefreshTotalPrice.mockReturnValue(10);
  test('if checkout button is enable and redirect to checkout page', () => {
    const { queryByTestId } = render(
      <TrybeerContext.Provider value={storeMock}>
        <CheckoutButton />
      </TrybeerContext.Provider>
    );    
    expect(queryByTestId('checkout-bottom-btn').disabled).toBeFalsy();
    fireEvent.click(queryByTestId('checkout-bottom-btn'));
    expect(history.location.pathname).toBe('/checkout');
  });
});
