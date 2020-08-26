const createProductsModel = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL(4, 2) },
    url_image: { type: DataTypes.STRING },
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  return products;
};

module.exports = createProductsModel;
