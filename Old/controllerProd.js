const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../connection");
const productController = require("../../controllers/productController");
const productService = require("../../services/productService");

describe('3(Controller-Prod)- Verifica um endpoint para o cadastro de produtos', () => {
  describe('Verifica Fuc createProduct', () => {
    const response = {};
    const request = {};
    before(() => {
      request.body = { name:'produto1', quantity:11 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'createProduct').resolves({ id: 1, name: 'produto1', quantity: 11 });
    })

    after(() => {
      productService.createProduct.restore();
    })
    it('Sucesso Status 201', async () => {
      await productController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true)
    });
  });
});