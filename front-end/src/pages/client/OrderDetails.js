import React, { useEffect, useState } from 'react';
import axios from 'axios';
import history from '../../services/history';
import OrderCardDetails from '../../components/OrderCardDetails';

const sendRequestOrdersDetails = async (saleId, setErrorStatus) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  if (!token) {
    history.push('/login');
  };
  const resp = await axios({
    baseURL: `http://localhost:3001/sales/${saleId}`,
    method: 'get',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
  })
    .catch(({ response: { status, data: { error: { message } } } }) => setErrorStatus(`Error: ${status}. ${message}`));
  if (resp) return resp.data;
  return null;
};

const OrderDetails = ({ match: { params: { orderId } } }) => {
  const [, setErrorStatus] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const isLSExist = JSON.parse(localStorage.getItem('user'));
    if (!isLSExist || !isLSExist.token) history.push('/login');
    const fetchOrderDetails = async () => {
      setData(await sendRequestOrdersDetails(orderId, setErrorStatus));
    }
    fetchOrderDetails();
  }, [orderId, setErrorStatus]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <OrderCardDetails data={data} id={orderId} />
    </div>
  );
};

export default OrderDetails;
