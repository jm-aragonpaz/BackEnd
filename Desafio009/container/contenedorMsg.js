const { json } = require('express');
const fs = require('fs');

class ContenedorMsg {
    constructor(fileName) {
        this.filePath = './api/mensajes.json';
    }
    getAll = async () => {
        try {
            const archivo = await fs.promises.readFile(this.filePath);
            const prods = JSON.parse(archivo);
            console.log('Se obtuvo el listado de mensajes de manera correcta');
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
        }
    };
    syncGetAll = async () => {
        try {
            const archivo = await fs.promises.readFileSync(this.filePath);
            const prods = JSON.parse(archivo);
            return prods;
        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);
        }
    };
    save = async (prod) => {
        try {
            const prods = await this.getAll();
            const id = prods.length === 0 ? 1 : prods[prods.length - 1].id + 1;
            prod.id = id;
            prods.push(prod);
            await fs.promises.writeFile(this.filePath, JSON.stringify(prods, null, 4));
            console.log(`Se guardo el mensaje con id: ${id}`);
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
        }
    };
    getById = async (id) => {
        try {
            const prods = await this.getAll();
            const prod = prods.find((prod) => prod.id == id);
            if (!prod) return `El producto con el id seleccionado no existe`;
            console.log(`Producto con el id ${id}: ${JSON.stringify(prod)}`);
            return prod;
        } catch (error) {
            console.log(`Hubo un error ${error}`);
        }
    };
    deleteById = async (id) => {
        try {
            const prods = await this.getAll();
            const prod = prods.find((prod) => prod.id == id);
            if (!prod) return `El id seleccionado no existe`;
            const noProd = prods.filter((prod) => prod.id != id);
            await fs.promises.writeFile(this.filePath, JSON.stringify(prods, null, 4));
            console.log(`Pro`);
        } catch (error) {}
    };
    updateById = async (id, obj) => {
        try {
            const prods = await this.getAll();
            const prod = prods.find((prod) => prod.id == id);
            if (prod) {
                (prod.name = obj.name),
                    (prod.price = obj.price),
                    (prod.thumbnail = obj.thumbnail),
                    console.log(prod);
                await fs.promises.writeFile(this.filePath, JSON.stringify(prods, null, 4));
                return prod;
            } else {
                return { error: 'Producto no encontrado' };
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 4));
            console.log(`Se ha borrado todo lo existente en el array`);
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
        }
    };
}
module.exports = ContenedorMsg;
