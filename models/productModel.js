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

const getAll = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM products',
  );
  return rows;
};

const getById = async (id) => {
  const [[rows]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return rows;
};

const update = async ({ name, quantity, id }) => {
  const [rows] = await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
  if (rows.affectedRows === 0) {
    return { message: 'Product not found' };
  }
  return { id, name, quantity };
};

const remove = async (id) => {
  const [[removedProduct]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  const { name, quantity } = removedProduct;
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return { id, name, quantity };
};

module.exports = {
  createProduct,
  validExistence,
  getById,
  getAll,
  update,
  remove,
};