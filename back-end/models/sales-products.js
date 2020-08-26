const createSalesProductsModel = (sequelize, _DataTypes) => {
  const salesProducts = sequelize.define(
    'sales_products', {}, { timestamps: false },
  );

  salesProducts.associate = (models) => {
    models.products.belongsToMany(models.sales, {
      as: 'sales', through: salesProducts, foreignKey: 'id', otherKey: 'id',
    });
    models.sales.belongsToMany(models.products, {
      as: 'products', through: salesProducts, foreignKey: 'id', otherKey: 'id',
    });
  };

  return salesProducts;
};

module.exports = createSalesProductsModel;
