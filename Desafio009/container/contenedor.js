const fs = require('fs');

class Contenedor {
    constructor(filename) {
        this.filePath = './api/productos.json';
    }

    getAll = async () => {
        try {
            const file = await fs.promises.readFile(this.filePath);
            const prods = JSON.parse(file);
            console.log('Se obtuvo la lista');
            return prods;
        } catch (error) {
            console.log(`Hubo un error al cargar los productos: ${error}`);
        }
    };
    syncGetAll = async () => {
        try {
            const file = await fs.promises.readFileSync(this.filePath);
            const prods = JSON.parse(file);
            return prods;
        } catch (error) {
            console.log(`Hubo un error al cargar los productos: ${error}`);
        }
    };
    save = async (producto) => {
        try {
            const prods = await this.getAll();
            const id = prods.length === 0 ? 1 : prods[prods.length - 1].id + 1;
            producto.id = id;
            prods.push(producto);
            await fs.promises.writeFile(this.filePath, JSON.stringify(prods, null, 4));
            console.log(`Se guardo el producto con el id: ${id}`);
        } catch (error) {
            console.log(`Hubo un error al guardar el producto: ${error}`);
        }
    };
    getById = async (id) => {
        try {
            const prods = await this.getAll();
            const prod = prods.find((prod) => prod.id == id);
            if (!prod) {
                return `El id del producto no existe`;
            }
            console.log(`El producto con el id ${id} ha sido encontrado: ${JSON.stringify(prod)}`);
            return prod;
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
        }
    };
    deleteById = async (id) => {
        try {
            const prods = await this.getAll();
            const prod = prods.find((prod) => prod.id == id);
            if (!prod) return `El id del producto no existe`;
            const noProd = prods.filter((prod) => prod.id != id);
            await fs.promises.writeFile(this.filePath, JSON.stringify(noProd, null, 4));
            console.log(`El producto con id: ${id}, fue eliminado exitosamente`);
        } catch (error) {
            console.log(`Se produjo un error: ${error}`);
        }
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
            console.log(`Todos los productos fueron eliminados exitosamente`);
        } catch (error) {
            console.log(`Hubo un error: ${error}`);
        }
    };
}
module.exports = Contenedor;
