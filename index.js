const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

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

// app.post('/sales', salestController.validName, salestController.validExistence,
// salestController.validQuantity, salestController.createProduct);
app.post('/sales', salesController.validProductId, salesController.validQuantity,
  salesController.createSales);

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);

app.put('/sales/:id', salesController.validProductId,
salesController.validQuantity, salesController.update);