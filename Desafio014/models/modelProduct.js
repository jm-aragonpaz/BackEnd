const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});
//                                 nombre de la coleccion (no de la base de datos!!)
const modelProduct = model('products', ProductoSchema);
module.exports = ProductoSchema;
