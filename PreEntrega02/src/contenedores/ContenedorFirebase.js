import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// import serviceAccount from '../../privi.json';
const serviceAccount = require('../../privi.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
console.log('Conectado');
const db = getFirestore();

function validacionId(array, id) {
    array = array.docs.map((item) => {
        return { id: item.id, ...item.data() };
    });
    const index = array.findIndex((object) => object.id == id);
    if (array[index]) {
        return true;
    } else {
        return false;
    }
}

class ContenedorFirebase {
    constructor(coleccion) {
        this.coleccion = db.collection(coleccion);
    }

    async listarTodos() {
        const res = await this.coleccion.get();
        let arrayRes = res.docs.map((item) => {
            return { id: item.id, ...item.data() };
        });
        return arrayRes;
    }

    async listarPorID(id) {
        const lista = await this.coleccion.get();
        const validacion = validacionId(lista, id);
        if (validacion) {
            let resultado = await this.coleccion.doc(id).get();
            return resultado.data();
        } else {
            return 'No existe el Id seleccionado';
        }
    }

    async save(objeto) {
        try {
            let res = await this.coleccion.add({
                timestamp: objeto.timestamp,
                name: objeto.name,
                description: objeto.description,
                code: objeto.code,
                imgUrl: objeto.imgUrl,
                price: objeto.price,
                stock: objeto.stock,
            });
            return res.id;
        } catch (error) {
            console.log('Se ha producido un error');
            return 'Se ha producido un error';
        }
    }

    async update(id, newkeys) {
        const lista = await this.coleccion.get();
        const validacion = validacionId(lista, id);
        if (validacion) {
            await this.coleccion.doc(id).update({
                timestamp: newkeys.timestamp,
                name: newkeys.name,
                description: newkeys.description,
                code: newkeys.code,
                imgUrl: newkeys.imgUrl,
                price: newkeys.price,
                stock: newkeys.stock,
            });
            return 'El producto se actualizó con exito';
        } else {
            return 'No existe el id seleccionado';
        }

        // const referenciaDoc = await db.collection(this.coleccion).doc(id);
        // const res = await referenciaDoc.update(LlavesCampoDosPuntosNuevoValor);
    }

    async delete(id) {
        const lista = await this.coleccion.get();
        const validacion = validacionId(lista, id);
        if (validacion) {
            await this.coleccion.doc(id).delete();
            return 'Se elimino el producto con exito';
        } else {
            return 'No existe el id seleccionado';
        }
    }

    async addCart(timestamp) {
        try {
            let result = await this.coleccion.add({
                timestamp: timestamp,
                productos: [],
            });
            return result.id;
        } catch (error) {
            console.log('Se produjo un error');
            return 'Se produjo un error';
        }
    }
    async getProductsFromCart(id) {
        let resultado = await this.coleccion.doc(id).get();
        resultado = resultado.data();
        return resultado.productos;
    }

    async addProdToCart(id, producto, id_prod) {
        let resultado = await this.coleccion.doc(id).get();
        resultado = resultado.data();
        producto['id'] = id_prod;
        resultado.productos.push(producto);
        await this.coleccion.doc(id).update({
            productos: resultado.productos,
        });
    }
    async eliminarProductoDelCarrito(id, id_prod) {
        let resultado = await this.coleccion.doc(id).get();
        resultado = resultado.data();
        const indexProducto = resultado.productos.findIndex((object) => object.id == id_prod);
        resultado.productos.splice(indexProducto, 1);
        await this.coleccion.doc(id).update({
            productos: resultado.productos,
        });
    }
}

export default ContenedorFirebase;
