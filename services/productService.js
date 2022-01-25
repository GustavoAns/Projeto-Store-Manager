const productModel = require('../models/productModel');

const createProduct = async ({ name, quantity }) => {
  const product = await productModel.createProduct({ name, quantity });
  return product;
};

const validExistence = async (name) => {
  const product = await productModel.validExistence(name);
  return product;
};

module.exports = {
  createProduct,
  validExistence,
};
