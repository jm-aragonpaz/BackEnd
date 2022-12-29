import { connect } from 'mongoose';
import { Schema, model } from 'mongoose';
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';

const CarritoSchema = new Schema({
    id: { type: Number, required: true, max: 100 },
    timestamp: { type: Date, required: true, max: 100 },
    productos: { type: Array, required: true, max: 100 },
});

const CarritosMongoDB = model('carritos', CarritoSchema);

const rutaConnectCarritos = 'mongodb://127.0.0.1:27017/CarritosDB';
const CarritosDBMongo = 'CarritosDB';
const coleccionCarritos = 'carritos';

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(rutaConnectCarritos, CarritoSchema, CarritosDBMongo, coleccionCarritos);
    }
}

export default CarritosDaoMongoDB;
