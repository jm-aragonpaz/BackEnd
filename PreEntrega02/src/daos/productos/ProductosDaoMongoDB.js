import { connect } from 'mongoose';
import { Schema, model } from 'mongoose';
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';

const ProductoSchema = new Schema({
    id: { type: Number, required: true, max: 100 },
    timestamp: { type: Date, required: true, max: 100 },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    codigo: { type: String, required: true, max: 100 },
    foto: { type: String, required: true, max: 1000 },
    precio: { type: Number, required: true, max: 100 },
    stock: { type: Number, required: true, max: 1000 },
});

const ProductosMongoDB = model('productos', ProductoSchema);

const rutaConnectProductos = 'mongodb://127.0.0.1:27017/ProductosDB';
const ProductosDBMongo = 'ProductosDB';
const coleccionProductos = 'productos';

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(rutaConnectProductos, ProductoSchema, ProductosDBMongo, coleccionProductos);
    }
}

export default ProductosDaoMongoDB;
