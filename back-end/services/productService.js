const { products } = require('../models');

const getAllProducts = async () => {
  const prod = await products.findAll({
    attributes: ['id', 'name', 'price', ['url_image', 'urlImage']],
  });
  console.log('p', prod);
  return prod;
};

const getProductById = async (id) => {
  const productAnswer = await products.findOne({
    where: { id },
    attributes: ['id', 'name', 'price', ['url_image', 'urlImage']],
  });
  if (!productAnswer) {
    return { error: true, message: 'Product not found', code: 'not_found' };
  }
  return productAnswer;
};

module.exports = {
  getAllProducts,
  getProductById,
};
