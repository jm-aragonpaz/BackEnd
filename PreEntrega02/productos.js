import express from 'express';
import instancia from './src/daos/index.js';

const { Router } = express;
const productosRouter = Router();

const productos = new instancia.producto();

let esAdmin = true;
const middlewareAdmin = (req, res, next) => {
    if (esAdmin) {
        next();
    } else {
        console.log('error: -1, ruta o metodo no autorizado');
        {
            error: -1, 'ruta o metodo no autorizado';
        }
    }
};

productosRouter.get('/:id?', async (req, res) => {
    const { id } = req.params;
    if (id) {
        const listaProductos = await productos.listarPorID(id);
        res.json({ productos: listaProductos });
    } else {
        const listaProductos = await productos.listarTodos();
        res.json({ productos: listaProductos });
    }
});

productosRouter.use(middlewareAdmin);

productosRouter.post('/', async (req, res) => {
    const { name, description, code, imgUrl, price, stock } = req.body;
    // console.log('Esto es del body', req.body);
    let addProd = await productos.save({ name, timestamp: Date.now(), description, code, imgUrl, price, stock });
    res.json({ added: addProd });
});

productosRouter.put('/:id?', async (req, res) => {
    const { id } = req.params;
    const { name, description, code, imgUrl, price, stock } = req.body;
    let replaceProd = await productos.update(id, { name, timestamp: Date.now(), description, code, imgUrl, price, stock });
    res.json({ replaced: replaceProd });
});

productosRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let deleteProd = await productos.delete(id);
    res.json({ deletedId: id });
});

export default productosRouter;
