const connection = require('./connection');

const createSale = async (sale, status = 'Pendente') => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, saleDate } = sale;
  const session = await connection();
  const id = await session.sql(
    `INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)
    VALUES (?, ?, ?, ?, ?, ?);`,
  )
    .bind(userId)
    .bind(totalPrice)
    .bind(deliveryAddress)
    .bind(deliveryNumber)
    .bind(saleDate)
    .bind(status)
    .execute()
    .then((result) => result.getAutoIncrementValue());
  return { id };
};

const createSaleProducts = async (saleId, productId, quantity) => {
  const session = await connection();
  await session.sql(
    `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`,
  )
    .bind(saleId)
    .bind(productId)
    .bind(quantity)
    .execute();
};

const getSaleBy = async (paramKey, paramValue) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT id, total_price, sale_date
    FROM sales
    WHERE ${paramKey} = ?;`,
  )
    .bind(paramValue)
    .execute()
    .then((results) => results.fetchAll() || [])
    .then((sales) => sales.map(
      ([id, totalPrice, saleDate]) =>
        ({ saleId: id, totalPrice, saleDate }),
    ));
  if (!result.length) return null;
  return result;
};

const getSalesByUserId = async (userId) => getSaleBy('user_id', userId);

const getSaleById = async (saleId) => getSaleBy('id', saleId);

const getAllSales = async () => {
  const session = await connection();
  const result = await session.sql(
    `SELECT id, total_price, delivery_address, delivery_number, status
    FROM sales;`,
  )
    .execute()
    .then((results) => results.fetchAll())
    .then((sales) => sales.map(
      ([id, totalPrice, deliveryAddress, deliveryNumber, status]) =>
        ({ saleId: id, totalPrice, deliveryAddress, deliveryNumber, status }),
    ));
  if (!result.length) return null;
  return result;
};

const getSaleProductsByUserId = async (userId, paramSaleId) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT sp.sale_id, p.name, sp.quantity, p.price, s.total_price, s.sale_date
    FROM sales_products AS sp
    INNER JOIN products AS p ON p.id = sp.product_id
    INNER JOIN sales AS s ON s.id = sp.sale_id
    WHERE s.user_id = ? AND sp.sale_id = ?;`,
  )
    .bind(userId)
    .bind(paramSaleId)
    .execute()
    .then((results) => results.fetchAll())
    .then((saleProducts) => saleProducts.map(
      ([saleId, name, quantity, price, totalPrice, saleDate]) =>
        ({ saleId, name, quantity, price, totalPrice, saleDate }),
    ));
  if (!result.length) return null;
  return result;
};

const getAllSaleProducts = async (paramSaleId) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT sp.sale_id, p.name, sp.quantity, p.price, s.total_price, s.status
    FROM sales_products AS sp
    INNER JOIN products AS p ON p.id = sp.product_id
    INNER JOIN sales AS s ON s.id = sp.sale_id
    WHERE sp.sale_id = ?;`,
  )
    .bind(paramSaleId)
    .execute()
    .then((results) => results.fetchAll())
    .then((saleProducts) => saleProducts.map(
      ([saleId, name, quantity, price, totalPrice, status]) =>
        ({ saleId, name, quantity, price, totalPrice, status }),
    ));
  if (!result.length) return null;
  return result;
};

const updateSaleById = async (paramId) => {
  const session = await connection();
  await session.sql(
    `UPDATE sales
    SET status = "Entregue"
    WHERE id = ?;`,
  )
    .bind(paramId)
    .execute();
};

module.exports = {
  createSale,
  createSaleProducts,
  getSalesByUserId,
  getAllSales,
  getSaleProductsByUserId,
  getAllSaleProducts,
  getSaleById,
  updateSaleById,
};
