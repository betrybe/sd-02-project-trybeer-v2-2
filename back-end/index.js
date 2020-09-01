require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const errorController = require('./controllers/errorController');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');
const middlewares = require('./middlewares/validateJwt');

const app = express();
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/users', userController.createUser);

app.post('/login', userController.loginUser);
app.get('/login', middlewares.loginJwt, userController.getLoginUser);

app.patch('/users/me', middlewares.loginJwt, userController.updateUserById);

app.get('/products', middlewares.loginJwt, productController.getAllProducts);
app.get('/products/:id', middlewares.loginJwt, productController.getProductById);

app.get('/sales', middlewares.loginJwt, saleController.getSale);
app.post('/sales', middlewares.loginJwt, saleController.createSale);
app.get('/sales/:id', middlewares.loginJwt, saleController.getSaleProducts);
app.patch('/sales/:id', middlewares.loginJwt, saleController.updateSaleById);

app.use(errorController.promiseErrors);

app.all('*', errorController.endpointNotFound);

const NODE_PORT = process.env.NODE_PORT || 3001;
const CHAT_PORT = process.env.CHAT_PORT || 5000;

app.listen(NODE_PORT, () => console.log(`Listening on ${NODE_PORT}`));

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', `${msg}`);
  });
});

http.listen(CHAT_PORT, () => console.log(`Chat Listening on ${CHAT_PORT}`));
