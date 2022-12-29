import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('src/DB/carritos.json');
    }
}

export default CarritosDaoArchivo;
