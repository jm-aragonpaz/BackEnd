import ProductosDaoArchivo from './productos/ProductosDaoArchivo.js';
import CarritosDaoArchivo from './carritos/CarritosDaoArchivo.js';
import ProductosDaoMemoria from './productos/ProductosDaoMemoria.js';
import CarritosDaoMemoria from './carritos/CarritosDaoMemoria.js';
import ProductosDaoMongoDB from './productos/ProductosDaoMongoDB.js';
import CarritosDaoMongoDB from './carritos/CarritosDaoMongoDB.js';
import ProductosDaoFirebase from './productos/ProductosDaoFirebase.js';
import CarritosDaoFirebase from './carritos/CarritosDaoFirebase.js';
import { connect } from 'mongoose';
import persistence from './config.js';
import { config } from 'dotenv';
config();

const instancias = [
    {
        nombre: ProductosDaoArchivo,
        id: 'archivo',
        description: 'producto',
    },
    {
        nombre: CarritosDaoArchivo,
        id: 'archivo',
        description: 'carrito',
    },
    {
        nombre: ProductosDaoMemoria,
        id: 'memoria',
        description: 'producto',
    },
    {
        nombre: CarritosDaoMemoria,
        id: 'memoria',
        description: 'carrito',
    },
    {
        nombre: ProductosDaoMongoDB,
        id: 'mongo',
        description: 'producto',
    },
    {
        nombre: CarritosDaoMongoDB,
        id: 'mongo',
        description: 'carrito',
    },
    {
        nombre: ProductosDaoFirebase,
        id: 'firebase',
        description: 'producto',
    },
    {
        nombre: CarritosDaoFirebase,
        id: 'firebase',
        description: 'carrito',
    },
];
const instancia = instancias.filter((i) => i.id == process.env.INSTANCIA);
// console.log(instancia);
async function connectMG() {
    try {
        await connect(process.env.MongoUrl, { useNewUrlParser: true });
        console.log('me conecte a mongo');
    } catch (e) {
        console.log(e);
        throw 'can not connect to the db';
    }
}
if (instancia[0].id == 'mongo') {
    // console.log(process.env.MongoUrl);
    connectMG();
    // console.log('pase por aca');
}
// console.log([instancia[0].description], [instancia[0].nombre]);
const resultado = {
    [instancia[0].description]: instancia[0].nombre,
    [instancia[1].description]: instancia[1].nombre,
};
export default resultado;
