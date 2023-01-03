import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

// const archivoConfig = './privi.json';
// const coleccionProductos = 'productos';

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('productos');
    }
}

export default ProductosDaoFirebase;
