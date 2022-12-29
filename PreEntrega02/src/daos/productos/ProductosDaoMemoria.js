import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js';
const arrMemoria = [];

class ProductosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super(arrMemoria);
    }
}

export default ProductosDaoMemoria;
