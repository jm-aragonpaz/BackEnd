import { connect } from 'mongoose';
import { Schema, model } from 'mongoose';
import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import { ModeloCarritos } from '../../models/carritos.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super({
            name: 'carritos',
            schema: ModeloCarritos.CartsSchema,
        });
    }
}

export default CarritosDaoMongoDB;
