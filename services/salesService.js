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
  console.log(id);
  const allSales = await salesModel.getById(id);
  return allSales;
};

module.exports = {
  createSales,
  getAll,
  getById,
};
