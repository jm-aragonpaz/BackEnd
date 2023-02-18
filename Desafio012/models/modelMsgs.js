const { Schema, model } = require('mongoose');

const MsgsSchema = new Schema({
    author: {
        id: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: {
            type: String,
            required: false,
            default: 'https://cdn-icons-png.flaticon.com/512/1236/1236123.png',
        },
    },
    text: { type: String, required: true },
});

const modelMsgs = model('mensajes', MsgsSchema);
module.exports = modelMsgs;
