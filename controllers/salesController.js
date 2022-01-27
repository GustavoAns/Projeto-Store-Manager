const salesService = require('../services/salesService');

const salesCameCase = (objs) => 
  objs.map((obj) => ({
    productId: obj.product_id,
    quantity: obj.quantity,
  }));

const validProductId = async (req, res, next) => {
  const { body } = req;
  const cameCaseObj = salesCameCase(body);
  const noProduct = cameCaseObj.some(({ productId }) => !productId);
  if (noProduct) {
    return res.status(400).json({ message: '"product_id" is required' });
  }
  return next();
};

const validQuantity = async (req, res, next) => {
  const noQuantity = req.body.some(
    ({ quantity }) => quantity === undefined,
  );

  if (noQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const validQuant = req.body.some(
    ({ quantity }) => typeof quantity !== 'number' || quantity < 1,
  );

  if (validQuant) {
    return res.status(422).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    );
  }
  next();
};

const createSales = async (req, res) => {
  const { body } = req;
  console.log('Passou pelo controller');
  const product = await salesService.createSales(body);
  res.status(201).json(product);
};

const getAll = async (_req, res) => {
  const product = await salesService.getAll();
  console.log('Get All');
  return res.status(200).json(product);
};

const getById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = await salesService.getById(id);
  console.log(product);
  if (product.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(product);
};

module.exports = {
  validProductId,
  validQuantity,
  createSales,
  getAll,
  getById,
};
