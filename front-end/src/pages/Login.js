import React, { useState } from 'react';
import history from '../services/history';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const sendLoginRequest = async (email, password, setErrorMessage) => {
  const loginData = await axios({
    baseURL: `http://localhost:3001/login`,
    method: 'post',
    data: {
      email,
      password
    },
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  })
    .catch(({ response }) => response);
  // .catch(({ response: { status, data: { error: { message }}} }) => setErrorMessage(`Error: ${status}. ${message}`));

  if (!loginData) return setErrorMessage('Error: Falha de Conexão');

  return loginData.data.error
    ? setErrorMessage(`Error: ${loginData.status}. ${loginData.data.error.message}`)
    : loginRedirect(loginData);
}

const loginRedirect = ({ data: { name, email, token, role } }) => {
  localStorage.setItem('user', JSON.stringify({ name, email, token, role }));
  if (role === 'administrator') return history.push('/admin/orders');
  return history.push('/products');
}

const renderPage = (interactiveFormField, formValidation, [emailData, passData, isEmailGood, isPasswordGood, setShouldRegister, errorMessage, setErrorMessage]) => (
  <div className="login-page">
    <div className="error-div">{errorMessage}</div>
    <div className="form-container">
      <form className="login-form">
        {interactiveFormField('email-input', 'email', formValidation)}
        {interactiveFormField('password-input', 'password', formValidation)}
        <button
          className="login-btn"
          disabled={!(isEmailGood && isPasswordGood)}
          data-testid="signin-btn"
          onClick={(e) => {
            e.preventDefault();
            sendLoginRequest(emailData, passData, setErrorMessage)
          }}>
          ENTRAR
        </button>
      </form>
    </div>
    <div className="no-account-btn-container">
      <button
        data-testid="no-account-btn"
        className="no-account-btn"
        onClick={() => setShouldRegister(true)}>
        Ainda não tenho conta
      </button>
    </div>
  </div>
)


const formValidation = ([type, value], setPassData, setIsPasswordGood, setEmailData, setIsEmailGood) => {
  if (type === 'password') {
    setPassData(value)
    if (value.length >= 6) return setIsPasswordGood(true)
    return setIsPasswordGood(false);
  }
  setEmailData(value)
  const isMailValid = value.match(MAIL_REGEX);
  if (isMailValid !== null) return setIsEmailGood(true)
  return setIsEmailGood(false);
}

const LoginScreen = () => {
  const [emailData, setEmailData] = useState('');
  const [passData, setPassData] = useState('');
  const [isEmailGood, setIsEmailGood] = useState(false);
  const [isPasswordGood, setIsPasswordGood] = useState(false);
  const [shouldRegister, setShouldRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (shouldRegister) return <Redirect to="/register" />

  const interactiveFormField = (formName, type, formValidation) => (
    <label className="form-label" htmlFor={formName}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
      <br />
      <input
        type={type}
        id={formName}
        className="form-field"
        data-testid={formName}
        onChange={(e) => formValidation([type, e.target.value], setPassData, setIsPasswordGood, setEmailData, setIsEmailGood)} />
    </label>
  );

  return renderPage(interactiveFormField, formValidation, [emailData, passData, isEmailGood, isPasswordGood, setShouldRegister, errorMessage, setErrorMessage]);
}

export default LoginScreen;
