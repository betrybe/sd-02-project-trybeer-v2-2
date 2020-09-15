/* eslint-disable no-param-reassign */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const http = require('http').createServer(express());
const sockets = require('socket.io')(http);

const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');
const {
  validateJWT, promiseErrors, endpointNotFound,
} = require('./middlewares');
const chatController = require('./controllers/chatController');

const app = express();
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/users', userController.createUser);
app.patch('/users/me', validateJWT, userController.updateUserById);
app.post('/users/chat', validateJWT, chatController.clientAdminMessage);
app.post('/users/admin/chat', validateJWT, chatController.adminClientMessage);

app.get('/login', validateJWT, userController.getLoginUser);
app.post('/login', userController.loginUser);

app.get('/products', validateJWT, productController.getAllProducts);
app.get('/products/:id', validateJWT, productController.getProductById);

app.get('/sales', validateJWT, saleController.getSale);
app.post('/sales', validateJWT, saleController.createSale);
app.get('/sales/:id', validateJWT, saleController.getSaleProducts);
app.patch('/sales/:id', validateJWT, saleController.updateSaleById);

app.use(promiseErrors);
// app.get('/messages/:email', validateJWT, chatController.getMessages);

app.use(promiseErrors);

app.all('*', endpointNotFound);

const NODE_PORT = process.env.NODE_PORT || 3001;
const CHAT_PORT = process.env.CHAT_PORT || 5000;

app.listen(NODE_PORT, () => console.log(`Listening on ${NODE_PORT}`));

const clientsToAdmins = sockets.of('admin');
let usersId = [];

sockets.on('connection', async (socket) => {
  socket.on('connected', (userData) => {
    const { email } = userData;
    const existUser = usersId.some((user) => user.email === email);
    if (!existUser) {
      usersId.push({ email, id: socket.id });
    }
  });

  socket.on('sentClientMessage', async (data) => {
    const { message, userData, emailClient } = data;
    clientsToAdmins.emit('receivedClientMessage', `${userData.email}: ${message}`);
    const clientId = usersId.find(({ email }) => email === emailClient || email === userData.email);
    sockets.to(clientId.id).emit('receivedClientMessage', `${userData.email}: ${message}`);
  });

  socket.on('disconnect', () => {
    usersId = usersId.filter(({ id }) => id !== socket.id);
  });

  socket.on('statusUpdate', ({ status, saleId }) => {
    sockets.emit(`${saleId}`, status);
  });
});

http.listen(CHAT_PORT, () => console.log(`Chat Listening on ${CHAT_PORT}`));
