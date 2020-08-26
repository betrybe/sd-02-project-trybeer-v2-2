const rescue = require('express-rescue');
const productService = require('../service/productService');

const getAllProducts = rescue(async (req, res, next) => {
  const serviceAnswer = await productService.getAllProducts();
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
});

const getProductById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const serviceAnswer = await productService.getProductById(id);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
});

module.exports = {
  getAllProducts,
  getProductById,
};
