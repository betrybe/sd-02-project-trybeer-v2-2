module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        type: Sequelize.INTEGER,
        references: { model: 'sales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      product_id: {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales_products');
  },
};
