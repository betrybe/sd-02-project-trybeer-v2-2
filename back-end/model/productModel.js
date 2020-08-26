const connection = require('./connection');

const getAllProducts = async () => {
  const session = await connection();
  const result = await session.sql(
    `SELECT id, name, price, url_image
    FROM products;`,
  )
    .execute()
    .then((results) => results.fetchAll())
    .then((products) => products.map(
      ([id, name, price, urlImage]) =>
        ({ id, name, price, urlImage }),
    ));
  return result;
};

const getProductById = async (param) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT id, name, price, url_image
    FROM products
    WHERE id = ?;`,
  )
    .bind(param)
    .execute()
    .then((results) => results.fetchAll()[0] || []);

  if (!result.length) return null;
  const [id, name, price, urlImage] = result;

  return { id, name, price, urlImage };
};

const getProductsByIds = async (arrayIds) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT * 
    FROM project_trybeer.products
    WHERE id IN (${arrayIds.join()});`,
  )
    .execute()
    .then((results) => results.fetchAll())
    .then((products) => products.map(([id, name, price, urlImage]) => ({
      id, name, price, urlImage,
    })));

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByIds,
};
