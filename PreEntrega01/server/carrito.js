const express = require('express');
const { Router } = express;
const routerCart = Router();
const Contenedor = require('./classCarrito.js');
const carritos = new Contenedor('./data/carrito.txt');
////////////////////////////////////////////////////////////////////////////////
//CARRITO
//Crear carrito
routerCart.post('/', async (req, res) => {
    //Crear carrito
    const { title, description, code, price, stock, thumbnail, id } = req.body;
    let newCart = await carritos.createCart({ title, description, code, price, stock, thumbnail, id });
    res.json({ idCreatedCart: createdCart });
});
//Borrar carrito
routerCart.delete('/:id', async (req, res) => {
    //Vacia carrito y lo elimina
    const { id } = req.params;
    let delCart = await carritos.deleteCartById(id);
    res.json({ delCart: id });
});
//Lista de productos por id
routerCart.get('/:id/productos', async (req, res) => {
    //Lista todos los productos del carrito
    const { id } = req.params;
    let productList = await carritos.getProdById(id);
    res.json({ Productos: productList });
});
routerCart.post('/:id/productos', async (req, res) => {
    //Incorpora productos al carrito por su id de producto (ojo)
    const { id } = req.params;
    let { ...newProd } = req.body;
    let addedProd = await carritos.addProdToCart(id, newProd);
});
routerCart.delete('/:id/productos/:id_prod', async (req, res) => {
    //Borra un elemento del carrito segun su id de producto.
    const { id } = req.params;
    const { id_prod } = req.params;
    let delProd = await carritos.delProdFromCart(id, id_prod);
});

module.exports = routerCart;
