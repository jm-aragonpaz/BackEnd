import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

const archivoConfig = './privi.json';
const coleccionCarritos = 'carritos';

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super(archivoConfig, coleccionCarritos);
    }
}

export default CarritosDaoFirebase;
