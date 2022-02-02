const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../connection");
const productModel = require("../../models/productModel");

const objCreateProduct = {
  name: "product_name",
  quantity: 2
}

const nameTest = 'Martelo de Thor'

describe('1(Model-Prod)- Verifica um endpoint para o cadastro de produtos', () => {
  describe('Verifica Fuc createProduct', () => {
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
      const response = await productModel.createProduct(objCreateProduct);

      expect(response).to.be.a('object')
    });

    it('O objeto possui as keys necessarias', async () => {
      const response = await productModel.createProduct(objCreateProduct);

      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });

  });

  describe('Verifica Fuc validExistence False', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([[{ id: 10, name: 'Martelo de Thor', quantity: 10 }]])
    })

    after(() => {
      connection.execute.restore();
    })
    it('retorna um boolean', async () => {
      const response = await productModel.validExistence(nameTest);

      expect(response).to.be.a('boolean')
    });

    it('Retorna false', async () => {
      const response = await productModel.validExistence(nameTest);

      expect(response).to.be.false
    });
  });

  describe('Verifica Fuc validExistence True', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([[]])
    })

    after(() => {
      connection.execute.restore();
    })
    it('retorna um boolean', async () => {
      const response = await productModel.validExistence(nameTest);

      expect(response).to.be.a('boolean')
    });

    it('Retorna True', async () => {
      const response = await productModel.validExistence(nameTest);

      expect(response).to.be.true
    });
  });

  describe('Verifica Fuc getAll', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([[
        { id: 1, name: 'produto1', quantity: 22 },
        { id: 2, name: 'produto2', quantity: 22 },
        { id: 3, name: 'produto3', quantity: 22 }
      ]])
    })

    after(() => {
      connection.execute.restore();
    })
    it('Retorna um array', async () => {
      const response = await productModel.getAll(nameTest);
      expect(response).to.be.a('array')
    });

    it('O array possui objetos com as keys necessarias', async () => {
      const [response] = await productModel.getAll(nameTest);

      expect(response).to.include.all.keys('id', 'name', 'quantity')
    });
  });
});