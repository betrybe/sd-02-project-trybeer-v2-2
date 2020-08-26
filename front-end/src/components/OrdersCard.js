import React from 'react';
import history  from '../services/history';
import '../styles/OrdersCard.css'
import formatDateFunc from '../services/formatDateFunc';
import formatPriceFunc from '../services/formatPriceFunc';

const redirectToDetailsPage = (orderId) => {
  history.push(`/orders/${orderId}`)
}

const OrdersCard = ({ orders, index }) => {
  const formattedPrice = formatPriceFunc(orders.totalPrice);
  const formattedDate = formatDateFunc(orders.saleDate);

  return (
    <button
      type="button" className="order-card-container"
      onClick={() => redirectToDetailsPage(orders.saleId)}>
      <div className="order-card-top-content">
        <div data-testid={`${index}-order-number`} className="order-card-text">
          {`Pedido ${orders.saleId}`}
        </div>
        <div className="order-card-text" data-testid={`${index}-order-date`}>
          {formattedDate}
        </div>
      </div>
      <div className="order-card-bot-content">
        <div className="order-card-text" data-testid={`${index}-order-total-value`}>
          {formattedPrice}
        </div>
      </div>
    </button>
  );
};

export default OrdersCard;
