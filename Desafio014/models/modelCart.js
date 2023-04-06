const { Schema, model } = require('mongoose');
const CarritoSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  productos: [{ type: Object }],
});
//                              nombre de la coleccion (no de la base de datos!!)
const modelCart = model('carts', CarritoSchema);
module.exports = modelCart;
