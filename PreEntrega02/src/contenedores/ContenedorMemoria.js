class ContenedorMemoria {
    constructor(arrayMemoria) {
        this.arrayMemoria = arrayMemoria;
    }

    async listarTodos() {
        try {
            const objetos = arrayMemoria;
            return objetos;
        } catch (err) {
            console.log(arrayMemoria);
            return { error: 'No encuentro todos los productos' };
        }
    }

    async listarPorID(id) {
        const objetos = arrayMemoria;

        const buscado = arrayMemoria.find((ob) => ob.id == id);
        if (buscado) {
            return buscado;
        } else {
            return { error: 'No encontrado' };
        }
    }

    async save(ob) {
        try {
            const objs = await this.listarTodos();
            let id;
            if (!objs || !objs.lenght) {
                id = 1;
                console.log(id);
            } else {
                objs.forEach((ob) => {
                    id = ob.id;
                });
                id = id + 1;
            }
            // console.log(ob);
            const guardar = objs && objs.lenght ? [...objs, { ...ob, id }] : { ...ob, id };
            // console.log(guardar);
            let arrayMemoria = guardar;
            console.log(arrayMemoria);
        } catch (error) {
            return { error };
        }
    }

    async actualizar(objeto) {
        try {
            const objs = arrayMemoria;
            const obj = arrayMemoria.listarPorID(objeto.id);
            if (obj) {
                const newObj = [...objs, obj];
                arrayMemoria = newObj;
            }
        } catch (err) {
            return { err };
        }
    }

    async eliminar(id) {
        try {
            const objs = this.listarTodos();
            const obj = objs.listarPorID(objeto.id);
            if (!objs || !objs.lenght || !obj) {
                return { error: 'No se encontró qué borrar' };
            }
            const newObjs = objs.filter((ob) => ob.id != id);
            this.arrayMemoria = newObjs;
        } catch (err) {
            return { err };
        }
    }

    async eliminarProductoDelCarrito(id, id_prod) {
        try {
            const esteCarrito = this.listarPorID(id);

            if (esteCarrito) {
                let listaProductos = esteCarrito.productos;
                listaProductos.filter((item) => item.id != id_prod);
                esteCarrito.productos = listaProductos;
                this.arrayMemoria.map((item) => {
                    if (item.id == id) {
                        item = [...esteCarrito];
                    } else {
                        return item;
                    }
                });
            } else {
                console.log('no existe el carrito');
            }
        } catch (error) {
            return { error };
        }
    }
}

export default ContenedorMemoria;
