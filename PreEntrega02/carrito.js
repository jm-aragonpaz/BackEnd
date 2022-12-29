import express from 'express';
import instancia from './src/daos/index.js';
const { Router } = express;
const routerCarrito = Router();

const carritos = new instancia.carrito();

routerCarrito.post('/', async (req, res) => {
    const { ...obj } = req.body;
    let newCart = await carritos.save({ ...obj });
    res.json({ saved: obj.id });
});

routerCarrito.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let delCart = await carritos.delete(id);
    res.json({ delCart: id });
});

routerCarrito.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    let list;
    if (id) {
        list = await carritos.listarPorID(id);
    } else {
        list = await carritos.listAll();
    }
    res.json({ products: list });
});

routerCarrito.post('/:id/productos', async (req, res) => {
    const { id } = req.params;
    let { ...newCart } = req.body;
    let addedProd = await carritos.save(newCart);
});

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id } = req.params;
    const { id_prod } = req.params;
    let delProd = await carritos.delProdFromCart(id, id_prod);
});

export default routerCarrito;
