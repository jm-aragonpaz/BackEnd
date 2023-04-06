const contenedorMongoDB = require('../../contenedores/ContenedorMongoDB.js');
const modelCart = require('../../models/modelCarritos.js');

class CarritosDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super({
      name: 'carts', //name collection
      schema: modelCart.CartsSchema,
    });
  }
}

module.exports = CarritosDaoMongoDB;
