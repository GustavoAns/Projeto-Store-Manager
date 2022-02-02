const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../connection");
const salesController = require("../../controllers/salesController");
const salesService = require("../../services/salesService");

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
});