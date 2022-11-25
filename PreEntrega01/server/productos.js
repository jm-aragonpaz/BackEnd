const express = require('express');
const { Router } = express;
const routerProducts = Router();
const Contenedor = require('./classProd.js');
const productos = new Contenedor('./data/productos.txt');
// let isAdmin = true;
let isAdmin = false;
//////////////////////////////////////////////////////////////////////
//RouterProducts
//GET
routerProducts.get('/', async (req, res) => {
    const products = await productos.getAll();
    if (products) {
        res.json(products);
    } else {
        res.json({ success: false, product: 'No hay productos' });
        return console.log('no hay productos');
    }
});
//GET:id
routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productos.getById(id);
    if (!product) {
        res.json({ error: true, msj: 'id no encontrado' });
    } else {
        res.json(product);
    }
});
//MIDDLEWARE
// const middelwareAdmin = (req, res, next) => {
//     if (isAdmin == true) {
//         next();
//     } else {
//         return res.status(403).json({
//             error: true,
//             codeError: '-1',
//             description: 'ruta /api/productos - método POST no autorizada',
//         });
//     }
// };
//POST
// routerProducts.use(middelwareAdmin);
routerProducts.post(
    '/',
    async (req, res) => {
        if (isAdmin == true) {
            next();
        } else {
            return res.status(403).json({
                error: true,
                codeError: '-1',
                description: 'ruta /api/productos - método POST no autorizada',
            });
        }
    },
    (req, res) => {
        const body = req.body;
        try {
            productos.save(body);
            console.log(body);
            res.json({ success: true, msj: 'El producto fue guardado correctamente', body });
        } catch (error) {
            res.json({ error: true, msj: 'No se pudo guardar el producto' });
        }
    }
);
//PUT:id
routerProducts.put(
    '/:id',
    async (req, res) => {
        if (isAdmin == true) {
            next();
        } else {
            return res.status(403).json({
                error: true,
                codeError: '-1',
                description: 'ruta /api/productos - método PUT no autorizada',
            });
        }
    },
    async (req, res) => {
        try {
            const { id } = req.params;
            const { title, price, thumbnail } = req.body;
            await productos.updateById(title, price, thumbnail, id);
            res.json({ succes: true, msj: 'Se actualio el producto' });
        } catch (error) {
            res.json({ error: true, msj: 'error, no se pudo actualizar el producto' });
        }
    }
);
//DELETE:id
routerProducts.delete(
    '/:id',
    async (req, res) => {
        if (isAdmin == true) {
            next();
        } else {
            return res.status(403).json({
                error: true,
                codeError: '-1',
                description: 'ruta /api/productos - método DELETE no autorizada',
            });
        }
    },
    async (req, res) => {
        try {
            const { id } = req.params;
            productos.deleteById(id);
            res.json({ success: true, msj: 'Producto borrado' });
        } catch (error) {
            res.json({ error: true, msj: 'No se pudo borrar el Producto' });
        }
    }
);
/////////////////////////////////////////////////////////////////////////////////
console.log(isAdmin);
let fecha = new Date(Date.now());
console.log(fecha.toLocaleString());

module.exports = routerProducts;
