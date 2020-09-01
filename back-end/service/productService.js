const productModel = require('../model/productModel');

const getAllProducts = async () => productModel.getAllProducts();

const getProductById = async (id) => {
  const productAnswer = await productModel.getProductById(id);
  if (!productAnswer) {
    return { error: true, message: 'Product not found', code: 'not_found' };
  }
  return productAnswer;
};

module.exports = {
  getAllProducts,
  getProductById,
};
