import { promises as fs } from 'fs';

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async listarTodos() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8');
            // console.log(objetos);
            const res = JSON.parse(objetos);
            return res;
        } catch (err) {
            return [];
        }
    }

    async listarPorID(id) {
        // console.log(id);
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8');
            console.log(objetos);
            const res = JSON.parse(objetos);
            // console.log(res);
            const buscado = res.find((ob) => ob.id == id);
            return buscado;
        } catch (error) {
            console.log(error);
        }
    }
    //     if (buscado) {
    //         return buscado;
    //     } else {
    //         return { error: 'No encontrado' };
    //     }
    // }

    async save(ob) {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8');
            const dataParse = JSON.parse(objs);
            console.log('Estos son los objetos', dataParse);
            const id = dataParse.length + 1;
            ob.timestamp = new Date(Date.now());
            ob.id = id;
            console.log(ob);
            dataParse.push(ob);
            // let id;
            // if (!objs || !objs.lenght) {
            //     id = 1;
            // } else {
            //     objs.forEach((ob) => {
            //         id = ob.id;
            //     });
            //     id = id + 1;
            // }
            // const guardar = objs && objs.lenght ? [...objs, { ...ob, id }] : { ...ob, id };
            console.log('Voy a guardar esto', ob);
            await fs.writeFile(this.ruta, JSON.stringify(dataParse), { encoding: 'utf-8' });
            // console.log('guarde', ob);
        } catch (error) {
            return { error };
        }
    }

    async update(objeto) {
        try {
            const objs = this.listarTodos();
            const obj = await this.listarPorID(objeto.id);
            if (obj) {
                const newObjt = [...objs, obj];
                await fs.writeFile(this.ruta, JSON.stringify(newObjt), { encoding: 'utf-8' });
                return 'Guardado con exito!';
            } else {
                throw new Error('No encontramos un item con ese id');
            }
        } catch (error) {
            return { error };
        }
    }

    async eliminar(id) {
        try {
            const objs = this.listarTodos();
            const obj = await this.listarPorID(objeto.id);
            if (!objs || !objs.lenght || !obj) {
                return { error: 'No se encontró qué borrar' };
            }
            const newObjs = objs.filter((ob) => ob.id != id);
            await fs.writeFile(this.ruta, newObjs, { encoding: 'utf-8' });
        } catch (err) {
            return { err };
        }
    }

    async eliminarProductoDelCarrito(id, id_prod) {
        try {
            const data = await fs.promises.readFile(this.ruta, 'utf-8');
            const arrCarritos = JSON.parse(data);
            let esteCarrito = arrCarritos.find((element) => element.id == idCarrito);
            if (esteCarrito) {
                let productosPrevios = esteCarrito.productos;
                let eliminarProd = productosPrevios.filter((el) => el.id != idProd);
                let carritoSinProd = { ...esteCarrito, productos: [...eliminarProd] };
                let nuevoArrCarritos = arrCarritos.map((element) => {
                    if (element.id == idCarrito) {
                        return { ...carritoSinProd };
                    } else {
                        return element;
                    }
                });
                const stringNuevoArr = JSON.stringify(nuevoArrCarritos);
                let escribirNuevoArr = await fs.promises.writeFile(this.ruta, stringNuevoArr);
            } else {
                console.log('no existe este carrito');
            }
        } catch (err) {
            console.log('Hubo un error: ', err);
        }
    }
}

export default ContenedorArchivo;
