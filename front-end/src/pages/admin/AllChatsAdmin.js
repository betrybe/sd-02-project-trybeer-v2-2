import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminSideBar from '../../components/admin/AdminSideBar';
import checkLogin from '../../services/checkLogin';
import './AdminChat.css';

const token = checkLogin();

const Conversations = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const requestChats = async () => {
      const { data } = await axios({
        baseURL: 'http://localhost:3001/users/chat',
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setChats(data);
    };
    requestChats();
  }, []);

  return (
    <div className="containerAllChats">
      <AdminSideBar />
      <div>
        {chats.map(({ email }) => (
          <div className="containerChat">
            <Link to={{ pathname: '/adminChat', state: { email } }}>
              <div className="containerEmail">
                {email}
              </div>
            </Link>
            {/* <div className="containerMessage">
              {messages.sentMessage}
            </div>
            <div className="containerTime">
              {messages.time}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
