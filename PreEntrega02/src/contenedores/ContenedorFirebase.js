import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

class ContenedorFirebase {
    constructor(archivoConfigFirebase, coleccion) {
        this.archivoConfigFirebase = archivoConfigFirebase;
    }

    inicializar() {
        const serviceAccount = require(this.archivoConfigFirebase);
        //inicializo app
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    crearReferenciaDB() {
        const db = getFirestore();
    }

    async listarTodos() {
        const res = await db.collection(this.coleccion).get();
        let arrayRes = res.docs.map((item) => {
            return { id: item.id, ...item.data() };
        });
        return arrayRes;
    }

    async listarPorID(id) {
        const res = await db.collection(this.coleccion).doc(id);
        return res;
    }

    async guardar(objeto) {
        const res = await db.collection(this.coleccion).doc().set(objeto);
        return res;
    }

    async actualizar(id, LlavesCampoDosPuntosNuevoValor) {
        const referenciaDoc = await db.collection(this.coleccion).doc(id);
        const res = await referenciaDoc.update(LlavesCampoDosPuntosNuevoValor);
    }

    async eliminar(id) {
        const res = await db.collection(this.coleccion).doc(id).delete();
        return res;
    }

    async eliminarProductoDelCarrito(id, id_prod) {
        //este carrito en coleccion carritos             //elimino producto en subcoleccion productos
        const eliminarProd = await db.collection(this.coleccion).doc(id).collection('productos').doc(id_prod).delete();
    }
}

export default ContenedorFirebase;
