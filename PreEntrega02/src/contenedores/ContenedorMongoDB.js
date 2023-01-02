import mongoose, { connect } from 'mongoose';
import { Schema, model } from 'mongoose';
import ModeloProductos from '../models/productos.js';

function validacionId(array, id) {
    const index = array.findIndex((object) => object.id == id);
    if (array[index]) {
        return true;
    } else {
        return false;
    }
}

class ContenedorMongoDB {
    constructor({ name, schema }) {
        console.log('aca llego');
        this.model = mongoose.model(name, schema);
    }

    async listarTodos() {
        const todos = await this.model.find({});
        console.log(todos);
    }

    async listarPorID(idNumber) {
        // await this.cualSchema.find({}).sort({ id: idNumber }).limit(1);
        const lista = await this.model.find({});
        const validacion = validacionId(lista, idNumber);
        if (validacion) {
            let resultado = await this.model.find({ _id: idNumber });
            resultado = resultado[0];
            return resultado;
        } else {
            return 'No existe el numero de id seleccionado';
        }
    }

    async save(objeto) {
        // const insertarObjeto = new this.cualSchema({ ...objeto });
        // const objGuardado = await insertarObjeto.save();
        try {
            const productoNuevo = new ModeloProductos({
                timestamp: objeto.timestamp,
                name: objeto.name,
                description: objeto.description,
                code: objeto.code,
                imgUrl: objeto.imgUrl,
                price: objeto.price,
                stock: objeto.stock,
            });
            await productoNuevo.save();
            const aux = await ModeloProductos.find({ name: objeto.name });
            const id = aux[0]._id;
            return id;
        } catch (error) {
            console.log('Se produjo un error', error);
            return 'Se produjo un error';
        }
    }

    async update(id, newkeys) {
        const lista = await ModeloProductos.find({});
        const validacion = validacionId(lista, id);
        if (validacion) {
            await ModeloProductos.updateOne({ _id: id }, { $set: newkeys });
            const aux = await ModeloProductos.find({ _id: id });
            return `Se actualizo el producto ${aux[0].name}`;
        } else {
            return 'No existe el numero de id seleccionado';
        }
    }

    async delete(idNumber) {
        const lista = await this.model.find({});
        const validacion = validacionId(lista, idNumber);
        if (validacion) {
            const aux = await this.model.find({ _id: idNumber });
            await this.model.deleteOne({ _id: idNumber });
            return `Se elimino con exito el producto con id ${aux[0].name}`;
        } else {
            return 'No existe el producto con el id elegido';
        }
    }

    async addCart(timestamp) {
        try {
            const carritoNuevo = new ModeloCarritos({
                timestamp: timestamp,
                productos: [],
            });
            await carritoNuevo.save();
            const aux = await ModeloCarritos.find({ timestamp: timestamp });
            const id = aux[0]._id;
            return id;
        } catch {
            console.log('Se ha producido un error');
            return 'Se ha producido un error';
        }
    }

    async getProductsFromCart(id) {
        const lista = await this.model.find({});
        const index = lista.findIndex((object) => object.id == id);
        return lista[index].productos;
    }

    async addProdToCart(num, producto, id_prod) {
        const lista = await this.model.find({});
        const index = lista.findIndex((object) => object.id == num);
        lista[index].productos.push(producto);
        await this.model.updateOne(
            { _id: num },
            {
                $set: {
                    productos: lista[index].productos,
                },
            }
        );
    }

    async delProdFromCart(num, id_prod) {
        const lista = await this.model.find({});
        const index = lista.findIndex((object) => object.id == num);
        const indexProduct = lista[index].productos.findIndex((object) => object.id == id_prod);
        lista[index].productos.splice(indexProduct, 1);
        await this.model.updateOne(
            { _id: num },
            {
                $set: {
                    productos: lista[index].productos,
                },
            }
        );
    }
}

export default ContenedorMongoDB;
