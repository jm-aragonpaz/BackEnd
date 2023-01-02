import { Schema, model, mongoose } from 'mongoose';

const ProductosSchema = new mongoose.Schema({
    // id: { type: Number, required: true, max: 100 },
    timestamp: { type: Date, required: true },
    name: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    imgUrl: { type: String, required: true, max: 1000 },
    price: { type: Number, required: true, max: 10000 },
    stock: { type: Number, required: true, max: 1000 },
});

const ModeloProductos = mongoose.model('productos', ProductosSchema);
export default ModeloProductos;
