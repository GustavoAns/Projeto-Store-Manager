const connection = require('../connection');

const createProduct = async ({ name, quantity }) => {
  const [rows] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

const validExistence = async (name) => {
  const [rows] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );
  if (rows.length > 0) {
    return false;
  } 
  return true;
};

module.exports = {
  createProduct,
  validExistence,
};