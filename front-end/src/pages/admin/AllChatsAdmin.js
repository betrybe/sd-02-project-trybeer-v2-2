import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/admin/AdminSideBar';
import checkLogin from '../../services/checkLogin';

const token = checkLogin();

const Conversations = () => {
  const [chats, setChats] = useState([]);

  useEffect(async () => {
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
  }, []);

  return (
    <div>
      <AdminSideBar />
      <div>
        {chats.map((chat) => console.log(chat))}
      </div>
    </div>
  );
};

export default Conversations;
