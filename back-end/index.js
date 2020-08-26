require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const errorController = require('./controller/errorController');
const userController = require('./controller/userController');
const productController = require('./controller/productController');
const saleController = require('./controller/saleController');
const middlewares = require('./middleware/validateJwt');

const app = express();
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/login', middlewares.loginJwt, userController.getLoginUser);

app.post('/login', userController.loginUser);
app.post('/users', userController.createUser);

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

app.listen(NODE_PORT, () => console.log(`Listening on ${NODE_PORT}`));
