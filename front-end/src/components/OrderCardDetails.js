import React from 'react';
import formatDateFunc from '../services/formatDateFunc';
import formatPriceFunc from '../services/formatPriceFunc';
import '../styles/OrderCardDetails.css';

const showSaleProducts = (products) => (
  products.map(({ name, price, quantity }, index) =>
    <div key={name} className="card-details-mid-container">
      <div data-testid={`${index}-product-qtd`}>
        {`${quantity} -`}
      </div>
      <div data-testid={`${index}-product-name`}>{name}</div>
      <div data-testid={`${index}-product-total-value`}>
        {formatPriceFunc(quantity * price)}
      </div>
    </div>
  )
);

const OrderCardDetails = ({ data, id }) => {
  const formatedDate = formatDateFunc(data[0].saleDate);
  return (
    <div className="card-details-container">
      <div className="card-details-top-container">
        <div data-testid="order-number">{`Pedido ${id}`}</div>
        <div data-testid="order-date">{formatedDate}</div>
      </div>
      {showSaleProducts(data)}
      <div data-testid="order-total-value" className="card-details-bot-container">
        {`Total: ${formatPriceFunc(data[0].totalPrice)}`}
      </div>
    </div>
  )
};

export default OrderCardDetails;
