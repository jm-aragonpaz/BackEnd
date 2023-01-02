import { mongoose } from 'mongoose';
import { Schema, model } from 'mongoose';
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import ModeloProductos from '../../models/productos.js';

// const ProductoSchema = new Schema({
//     id: { type: Number, required: true, max: 100 },
//     timestamp: { type: Date, required: true, max: 100 },
//     name: { type: String, required: true, max: 100 },
//     description: { type: String, required: true, max: 100 },
//     code: { type: String, required: true, max: 100 },
//     imgUrl: { type: String, required: true, max: 1000 },
//     price: { type: Number, required: true, max: 100 },
//     stock: { type: Number, required: true, max: 1000 },
// });

// const ProductosMongoDB = model('productos', ProductoSchema);

// const rutaConnectProductos = 'mongodb://127.0.0.1:27017/ProductosDB';
// const ProductosDBMongo = 'ecommerce';
// const coleccionProductos = 'productos';

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        // super(rutaConnectProductos, ProductosMongoDB, ProductosDBMongo, coleccionProductos);
        super({
            name: 'productos',
            schema: ModeloProductos.ProductosSchema,
        });
    }
}

export default ProductosDaoMongoDB;
