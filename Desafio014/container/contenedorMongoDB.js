//@ts-check
const mongoose = require('mongoose');
const modelMsgs = require('../models/modelMsgs.js');
const modelProducts = require('../models/modelProducts.js');
const logger = require('../utils/loggerWinston');

class contenedorMsgsMongoDB {
    constructor({ name, schema }) {
        this.model = mongoose.model(name, schema);
    }
    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            // console.log(`${error}, no se pueden mostrar todos los mensajes`);
            throw logger.error(error, 'no se pueden mostrar todos los mensajes');
        }
    }

    async save(title, price, thumbnail) {
        try {
            const newProduct = new modelProducts({
                title: title,
                price: price,
                thumbnail: thumbnail,
            });
            await newProduct.save();
        } catch (error) {
            // console.log(`${error}, Se produjo un error al guardar el producto`);
            throw logger.error(error, 'Se produjo un error al guardar el producto');
            return `Se produjo un error al guardar`;
        }
    }
    async saveMsg(id, nombre, apellido, edad, alias, avatar, text) {
        try {
            const newMsg = new modelMsgs({
                author: {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    alias: alias,
                    avatar: avatar,
                },
                text: text,
            });
            await newMsg.save();
        } catch (error) {
            // console.log(`${error}, Se produjo un error`);
            throw logger.error(error, 'Se produjo un error');
            return `Se ha producido un error`;
        }
    }
}

module.exports = contenedorMsgsMongoDB;
