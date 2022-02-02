const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../connection");
const salesModel = require("../../models/salesModel");

const objCreateSale = [
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

describe('1(Model-Sale)- Verifica um endpoint para o cadastro de produtos', () => {
  describe('Verifica Fuc createSales', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([
        ResultSetHeader = {
          affectedRows: 1,
          insertId: 25,
        },
        undefined
      ])
    })

    after(() => {
      connection.execute.restore();
    })
    it('Retorna um objeto', async () => {
      const response = await salesModel.createSales(objCreateSale);

      expect(response).to.be.a('object')
    });

    it('O objeto possui as keys necessarias', async () => {
      const response = await salesModel.createSales(objCreateSale);

      expect(response).to.include.all.keys('id', 'itemsSold')
    });

  });
});