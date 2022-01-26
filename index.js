const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
// const salestController = require('./controllers/salesController');
// const salesProductsController = require('./controllers/salesProductsController');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.post('/products', productController.validName, productController.validExistence,
  productController.validQuantity, productController.createProduct);

app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);

app.put('/products/:id', productController.validName,
  productController.validQuantity, productController.update);

app.delete('/products/:id', productController.validRemove, productController.remove);