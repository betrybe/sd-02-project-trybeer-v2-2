const createSalesModel = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    total_price: { type: DataTypes.DECIMAL(9, 2) },
    delivery_address: { type: DataTypes.STRING },
    delivery_number: { type: DataTypes.STRING },
    sale_date: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  sales.associate = (models) => {
    sales.belongsTo(models.users, { foreignKey: 'user_id' });
    sales.belongsToMany(models.products, {
      through: 'sales-products', foreignKey: 'product_id', otherKey: 'sale_id',
    });
  };

  return sales;
};

module.exports = createSalesModel;
