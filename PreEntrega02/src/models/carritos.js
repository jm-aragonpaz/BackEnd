import mongoose, { Schema, model } from 'mongoose';

const CarritosSchema = new mongoose.Schema({
    timestapmp: { type: String, required: true, max: 100 },
    productos: [{ type: Object }],
});

export const ModeloCarritos = model('carritos', CarritosSchema);
