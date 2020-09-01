const { products } = require('../models');

const getAllProducts = async () => {
  const prod = await products.findAll({
    attributes: { exclude: ['published', 'updated'] },
  });
  return prod;
};

const getProductById = async (id) => {
  const productAnswer = await products.findOne(
    { where: { id }, attributes: { exclude: ['published', 'updated'] } },
  );
  if (!productAnswer) {
    return { error: true, message: 'Product not found', code: 'not_found' };
  }
  return productAnswer;
};

module.exports = {
  getAllProducts,
  getProductById,
};
