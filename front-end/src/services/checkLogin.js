import history from './history';

export default function checkLogin () {
  const loginData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  if(!loginData) return history.push('/login')
  return loginData.token;
}
