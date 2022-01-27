const connection = require('../connection');

const createSales = async (body) => {
  console.log('Passou pelo Model');
  const date = (new Date());
  const [rowsId] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [date],
  );
  const id = rowsId.insertId;
  const promisesProd = body.map(async ({ product_id: productId, quantity }) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, productId, quantity],
    );
  });
  await Promise.all(promisesProd);
  return {
    id,
    itemsSold: body,
  };
};

const getAllSales = async () => {
  const [rows] = await connection.execute(
    'SELECT sale_id AS saleId, date, product_id, quantity FROM sales_products '
      + 'INNER JOIN sales ON sales_products.sale_id = sales.id',
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(
    'SELECT date, product_id, quantity FROM sales_products '
      + 'INNER JOIN sales ON sales_products.sale_id = sales.id WHERE sales_products.sale_id = ?',
      [id],
  );
  return rows;
};

module.exports = {
  createSales,
  getAllSales,
  getById,
};