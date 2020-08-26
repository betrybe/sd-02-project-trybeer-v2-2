import React, { useEffect, useState } from 'react';
import history from '../../services/history';
import ProductCard from '../../components/ProductCard';
import CheckoutButton from '../../components/CheckoutButton';
import axios from 'axios';
import '../../styles/Products.css';

export default function ClientProducts() {
  const [productData, setProductData] = useState([])
  const [errorStatus, setErrorStatus] = useState('');

  useEffect(() => {
    const productsRequest = async () => {
      const isUserLogged = JSON.parse(localStorage.getItem('user'));
      if (isUserLogged === null) return history.push('/login');

      const { token } = JSON.parse(localStorage.getItem('user'));
      const resp = await axios({
        baseURL: `http://localhost:3001/products`,
        method: 'get',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
      })
        .catch(({ response: { status, data: { error: { message } } } }) => {
          setErrorStatus(`Error: ${status}. ${message}`);
          return true;
        });
      if (!resp) return setErrorStatus('Error: 500. Falha na conexão com o banco');
      if (resp.data) return setProductData(resp.data);
      return null;
    };
    productsRequest();
  }, []);

  return (
    <div className="products-page">
      <div className="status-report-div">
        <span>{errorStatus}</span>
      </div>
      <div className="products-container">
        {productData && productData.map((product, index) => (
          <div className="product-card" key={product.id}><ProductCard product={product} index={index} /></div>))}
      </div>
      <div className="checkout-btn-container">
        <CheckoutButton />
      </div>
    </div>
  )
}