module.exports = class Contenedor {
    constructor(configKnex, stringNombreTabla) {
        this.configKnex = configKnex;
        this.stringNombreTabla = stringNombreTabla;
    }

    async save(objeto) {
        const knex = require('knex')(this.configKnex);
        try {
            const nuevoProd = await knex(this.stringNombreTabla)
                .insert({ ...objeto })
                .then(() => {
                    console.log('Registro exitoso');
                })
                .catch((err) => {
                    console.log(err);
                });

            return nuevoProd;
        } catch (err) {
            console.log('Hubo un error al guardar el producto: ', err);
        }
    }

    async getById(numId) {
        const knex = require('knex')(this.configKnex);
        try {
            const objBuscado = await knex
                .from(this.stringNombreTabla)
                .where('id', '=', numId)
                .then((data) => {
                    return data;
                })
                .catch((e) => {
                    console.log('no se encontró el objeto', e);
                });
            return objBuscado;
        } catch (err) {
            console.log('Hubo un error en getById: ', err);
        }
    }
    //ej campoValor --> {precio:1700}
    async replaceById(numId, campoValor, valor) {
        const knex = require('knex')(this.configKnex);
        try {
            const objReemplazar = await knex
                .from(this.stringNombreTabla)
                .where('id', '=', numId)
                .update(campoValor)
                .then(() => {
                    console.log('cambié el precio bien');
                })
                .catch((e) => {
                    console.log(e);
                });
            return objReemplazar;
        } catch (err) {
            console.log('Hubo un error en replaceById: ', err);
        }
    }

    async getAll() {
        const knex = require('knex')(this.configKnex);
        try {
            const data = await knex
                .from(this.stringNombreTabla)
                .select('*')
                .then((res) => {
                    return res;
                })
                .catch((e) => {
                    console.log(e);
                });
            return data;
        } catch (err) {
            console.log('Hubo un error: ', err);
        }
    }

    async deleteById(number) {
        const knex = require('knex')(this.configKnex);
        try {
            const borrarObjeto = knex
                .from(this.stringNombreTabla)
                .where('id', '=', number)
                .del()
                .catch((e) => {
                    console.log(e);
                });
        } catch (err) {
            console.log('Hubo un error al eliminar el objeto: ', err);
        }
    }

    async deleteAll() {
        const knex = require('knex')(this.configKnex);
        try {
            const borrarTodo = await knex
                .from(this.stringNombreTabla)
                .del()
                .catch((e) => {
                    console.log(e);
                });
        } catch (err) {
            console.log('Hubo un error: ', err);
        }
    }
};
