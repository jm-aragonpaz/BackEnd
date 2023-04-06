const contenedorMongoDB = require('../../contenedores/ContenedorMongoDB.js');
const modelProduct = require('../../models/modelProductos.js');

class ProductosDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super({
      name: 'products', //name collection
      schema: this.model.ProductsSchema,
    });
  }
}

module.exports = ProductosDaoMongoDB;
