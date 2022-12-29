import { connect } from 'mongoose';
import { Schema, model } from 'mongoose';

class ContenedorMongoDB {
    constructor(rutaConnect, cualSchema, baseDeDatos, coleccion) {
        (this.rutaConnect = rutaConnect), (this.cualSchema = cualSchema), (this.baseDeDatos = baseDeDatos), (this.coleccion = coleccion);
    }

    async connectMG() {
        try {
            await connect(rutaConnect, { useNewUrlParser: true });
        } catch (e) {
            console.log(e);
            throw 'cannot connect to the db';
        }
    }

    async listarTodos() {
        const todos = await this.coleccion.find({});
    }

    async listarPorID(idNumber) {
        await this.coleccion.find({}).sort({ id: idNumber }).limit(1);
    }

    async guardar(objeto) {
        const insertarObjeto = new this.cualSchema({ ...objeto });
        const objGuardado = await insertarObjeto.save();
    }

    async actualizar(id, LlavesCampoDosPuntosNuevoValor) {
        const query = { id: id };
        const update = {
            $set: LlavesCampoDosPuntosNuevoValor,
        };
        const options = { upsert: false };

        await this.coleccion
            .updateOne(query, update, options)
            .then((result) => {
                const { matchedCount, modifiedCount } = result;
                if (matchedCount && modifiedCount) {
                    console.log(`Se actualizó correctamente.`);
                }
            })
            .catch((err) => console.error(`No se pudo actualizar: ${err}`));
    }

    async eliminar(idNumber) {
        await this.coleccion.deleteOne({ id: idNumber });
    }

    async eliminarProductoDelCarrito(id, id_prod) {
        await this.coleccion.update(
            {
                id: ObjectId(id),
            },
            {
                $pull: {
                    productos: {
                        id: ObjectId(id_prod),
                    },
                },
            }
        );
    }
}

export default ContenedorMongoDB;
