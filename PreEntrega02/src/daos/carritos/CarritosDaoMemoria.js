import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js';
const arrMemoria = [];
class CarritosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super(arrMemoria);
    }
}

export default CarritosDaoMemoria;
