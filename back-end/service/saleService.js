const saleModel = require('../model/saleModel');
const productModel = require('../model/productModel');

const createSale = async (sale, userId, name) => {
  const { products: quantities, deliveryAddress, deliveryNumber } = sale;
  const productIds = quantities.map(({ productId }) => productId);
  const products = await productModel.getProductsByIds(productIds);

  if (products.length !== quantities.length) {
    return { error: true, message: 'Some products can not be found', code: 'invalid_data' };
  }

  const totalPrice = products.reduce((total, product) => {
    const productQuantity = quantities.find((quantity) => quantity.productId === product.id);
    return total + (productQuantity.quantity * product.price);
  }, 0);

  const saleDate = new Date().toISOString().replace('T', ' ').substring(0, 19);

  const mountedSale = { userId, totalPrice, deliveryAddress, deliveryNumber, saleDate };
  const newSale = await saleModel.createSale(mountedSale);
  await quantities.forEach(async ({ productId, quantity }) =>
    saleModel.createSaleProducts(newSale.id, productId, quantity));

  return { user: name, saleId: newSale.id, date: saleDate, total: totalPrice };
};

const getSale = async (id, role) => {
  let result;
  if (role === 'client') result = await saleModel.getSalesByUserId(id);
  if (role === 'administrator') result = await saleModel.getAllSales();
  if (!result) return { error: true, message: 'No sale was found', code: 'not_found' };
  return result;
};

const getSaleProducts = async (role, userId, saleId) => {
  let result;
  if (role === 'client') result = await saleModel.getSaleProductsByUserId(userId, saleId);
  if (role === 'administrator') result = await saleModel.getAllSaleProducts(saleId);
  if (!result) {
    return { error: true, message: 'Products of this sale were not found', code: 'not_found' };
  }
  return result;
};

const updateSaleById = async (saleId, role) => {
  if (role !== 'administrator') {
    return { error: true, message: 'Access denied', code: 'unauthorized' };
  }
  const result = await saleModel.getSaleById(saleId);
  if (!result) return { error: true, message: 'No sale was found', code: 'not_found' };
  await saleModel.updateSaleById(saleId);
  return result[0];
};

module.exports = {
  createSale,
  getSale,
  getSaleProducts,
  updateSaleById,
};
