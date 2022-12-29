import ProductosDaoArchivo from './productos/ProductosDaoArchivo.js';
import CarritosDaoArchivo from './carritos/CarritosDaoArchivo.js';
import ProductosDaoMemoria from './productos/ProductosDaoMemoria.js';
import CarritosDaoMemoria from './carritos/CarritosDaoMemoria.js';
import ProductosDaoMongoDB from './productos/ProductosDaoMongoDB.js';
import CarritosDaoMongoDB from './carritos/CarritosDaoMongoDB.js';
import ProductosDaoFirebase from './productos/ProductosDaoFirebase.js';
import CarritosDaoFirebase from './carritos/CarritosDaoFirebase.js';

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
        description: ' carrito',
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
const instancia = instancias.filter((i) => i.id == persistence);
// console.log([instancia[0].description], [instancia[0].nombre]);
const resultado = {
    [instancia[0].description]: instancia[0].nombre,
    [instancia[1].description]: instancia[1].nombre,
};
export default resultado;
