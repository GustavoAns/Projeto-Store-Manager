const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../connection");
const salesModel = require("../../models/salesModel");
const salesService = require("../../services/salesService");

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

const nameTest = 'Martelo de Thor'

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