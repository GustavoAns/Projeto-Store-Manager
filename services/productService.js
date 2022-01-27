const productModel = require('../models/productModel');

const createProduct = async ({ name, quantity }) => {
  const product = await productModel.createProduct({ name, quantity });
  return product;
};

const validExistence = async (name) => {
  const product = await productModel.validExistence(name);
  return product;
};

const getAll = async () => {
  const product = await productModel.getAll();
  return product;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const update = async ({ name, quantity, id }) => {
  const product = await productModel.update({ name, quantity, id });
  return product;
};

const remove = async (id) => {
  const product = await productModel.remove(id);
  return product;
};

const validRemove = async (id) => {
  const product = await productModel.getById(id);
  if (product === undefined) {
    return false;
  }
  return true;
};

module.exports = {
  createProduct,
  validExistence,
  getById,
  getAll,
  update,
  remove,
  validRemove,
};
