const productService = require('../services/productService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  
  const product = await productService.createProduct({ name, quantity });

  res.status(201).json(product);
};

const validName = async (req, res, next) => {
  const { name } = req.body;
  
  if (name && name.length >= 5) {
    next();
  } else {
    if (name === undefined) {
      return res.status(400).json({ message: '"name" is required' });
    }
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
};

const validExistence = async (req, res, next) => {
  const { name } = req.body;

  const productValided = await productService.validExistence(name);
  if (productValided === false) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  next();
};

const validQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  const type = typeof quantity;

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (type !== 'number' || quantity < 1) {
    return res.status(422).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    );
  }
  next();
};

module.exports = {
  createProduct,
  validName,
  validExistence,
  validQuantity,
};
