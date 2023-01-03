import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

// const archivoConfig = './privi.json';
// const coleccionCarritos = 'carritos';

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos');
    }
}

export default CarritosDaoFirebase;
