const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../../models/productModel");
const productService = require("../../services/productService");
const salesModel = require("../../models/salesModel");
const salesService = require("../../services/salesService");

const objCreateProduct = {
  name: "product_name",
  quantity: 2
}

const objCreateSales = [
  {
    product_id: 1,
    quantity: 2
  },
  {
    product_id: 2,
    quantity: 5
  }
]

describe('2(Service-Prod)- Verifica um endpoint para o cadastro de produtos', () => {
  describe('Verifica Fuc createProduct', () => {
    before(() => {
      sinon.stub(productModel, 'createProduct').resolves({ id: 1, name: "produto", quantity: 10 })
    })

    after(() => {
      sinon.restore();
    })
    it('Retorna um objeto', async () => {
      const response = await productService.createProduct(objCreateProduct);

      expect(response).to.be.a('object')
    });

    it('O objeto possui as keys necessarias', async () => {
      const response = await productService.createProduct(objCreateProduct);

      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });

  });

  describe('Verifica Fuc getAll', () => {
    before(() => {
      sinon.stub(productModel, 'getAll').resolves([[
        { id: 1, name: 'produto1', quantity: 22 },
        { id: 2, name: 'produto2', quantity: 22 },
        { id: 3, name: 'produto3', quantity: 22 }
      ]])
    })

    after(() => {
      sinon.restore();
    })
    it('Retorna um array', async () => {
      const response = await productService.getAll(objCreateProduct);

      expect(response).to.be.a('array')
    });

    it('O array possui objetos com as keys necessarias', async () => {
      const [[response]] = await productService.getAll(objCreateProduct);

      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });
  });

  describe('Verifica Fuc getById', () => {
    before(() => {
      sinon.stub(productModel, 'getById').resolves({ id: 1, name: 'produto1', quantity: 22 })
    })

    after(() => {
      sinon.restore();
    })
    it('Retorna um Object', async () => {
      const response = await productService.getById(objCreateProduct);

      expect(response).to.be.a('object')
    });

    it('O objetos possui as keys necessarias', async () => {
      const response = await productService.getById(objCreateProduct);

      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });
  });
});

describe('2(Service-Sales)- Verifica um endpoint para o cadastro de produtos', () => {
  describe('Verifica Fuc createSales', () => {
    before(() => {
      sinon.stub(salesModel, 'createSales').resolves({ id: 1, name: "produto", quantity: 10 })
    })

    after(() => {
      sinon.restore();
    })
    it('Retorna um objeto', async () => {
      const response = await salesService.createSales(objCreateSales);

      expect(response).to.be.a('object')
    });

    it('O objeto possui as keys necessarias', async () => {
      const response = await salesService.createSales(objCreateSales);

      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });

  });
});