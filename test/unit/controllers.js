const sinon = require("sinon");
const { expect } = require("chai");
const productController = require("../../controllers/productController");
const productService = require("../../services/productService");
const salesController = require("../../controllers/salesController");
const salesService = require("../../services/salesService");

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

  describe('Verifica Fuc getAll', () => {
    const response = {};
    const request = {};
    before(() => {
      request.body = { name:'produto1', quantity:11 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves({ id: 1, name: 'produto1', quantity: 11 });
    })

    after(() => {
      productService.getAll.restore();
    })
    it('Sucesso Status 201', async () => {
      await productController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true)
    });
  });

  describe('Verifica Fuc getById', () => {
    const response = {};
    const request = {};
    before(() => {
      request.body = { name:'produto1', quantity:11 };
      request.params = 1;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves({ id: 1, name: 'produto1', quantity: 11 });
    })

    after(() => {
      productService.getById.restore();
    })
    it('Sucesso Status 201', async () => {
      await productController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true)
    });
  });
});

describe('3(Controller-Sales)- Verifica um endpoint para o cadastro de Vendas', () => {
  describe('Verifica Fuc createSales', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { name:'produto1', quantity:11 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSales').resolves({ id: 1, name: 'produto1', quantity: 11 });
    })
    after(() => {
      salesService.createSales.restore();
    })

    it('Sucesso Status 201', async () => {
      await salesController.createSales(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true)
    });
  });

  describe('Verifica Fuc getAll', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { name:'produto1', quantity:11 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves({ id: 1, name: 'produto1', quantity: 11 });
    })
    after(() => {
      salesService.getAll.restore();
    })

    it('Sucesso Status 200', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true)
    });
  });

  describe('Verifica Fuc getById', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { name:'produto1', quantity:11 };
      request.params = 1;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves({ id: 1, name: 'produto1', quantity: 11 });
    })
    after(() => {
      salesService.getById.restore();
    })

    it('Sucesso Status 200', async () => {
      await salesController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true)
    });
  });
});