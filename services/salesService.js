const salesModel = require('../models/salesModel');

const createSales = async (body) => {
  console.log('Passou pelo Service');
  const product = await salesModel.createSales(body);
  return product;
};

const getAll = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getById = async (id) => {
  const allSales = await salesModel.getById(id);
  return allSales;
};

const update = async ({ productId, quantity, id }, body) => {
  const product = await salesModel.update({ productId, quantity, id }, body);
  return product;
};

module.exports = {
  createSales,
  getAll,
  getById,
  update,
};
