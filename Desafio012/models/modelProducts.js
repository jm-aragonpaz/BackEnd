const { Schema, model } = require('mongoose');

const ProductsSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
});

const modelProducts = model('productos', ProductsSchema);
module.exports = modelProducts;
