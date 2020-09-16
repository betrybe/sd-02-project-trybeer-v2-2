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
        {chats.length === 0
          ? (
            <div className="noMsg" data-testid="text-for-no-conversation">
              Nenhuma conversa por aqui
            </div>
          )
          : chats.map(({ email, messages }) => (
            <div className="containerChat" key={messages[0].time}>
              <Link to={{ pathname: '/admin/chat', state: { email, messages } }}>
                <div className="containerEmail" data-testid="profile-name">
                  {email}
                </div>
              </Link>
              <div className="containerTime" data-testid="last-message">
                {`Última mensagem às ${new Date(messages[0].time)
                  .toLocaleTimeString([], { timeStyle: 'short' })}`}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Conversations;
