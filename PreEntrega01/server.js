const express = require('express');
const app = express();
const { Router } = express;
const routerProducts = Router();
const routerCart = Router();
const Contenedor = require('./classContainer.js');
const data = new Contenedor('./productos.txt');

//Defino puertos de interacción
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App de PreEntrega 001 escuchando en el puerto http://localhost:${port}`);
});
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

app.get('/', (req, res) => {
    res.json({ titulo: 'PreEntrega 001', curso: 'BackEnd' });
});

// let isAdmin = true;
let isAdmin = false;
//////////////////////////////////////////////////////////////////////
//RouterProducts
//GET
routerProducts.get('/', async (req, res) => {
    const products = await data.getAll();
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
    const product = await data.getById(id);
    if (!product) {
        res.json({ error: true, msj: 'id no encontrado' });
    } else {
        res.json(product);
    }
});
//POST
routerProducts.post(
    '/',
    async (req, res) => {
        if (isAdmin == true) {
            next();
        } else {
            return res.status(403).json({
                error: true,
                codeError: '-2',
                description: 'Solo para administradores',
            });
        }
    },
    (req, res) => {
        const body = req.body;
        try {
            data.save(body);
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
                codeError: '-2',
                description: 'Solo para administradores',
            });
        }
    },
    async (req, res) => {
        try {
            const { id } = req.params;
            const { title, price, thumbnail } = req.body;
            await data.updateById(title, price, thumbnail, id);
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
                codeError: '-2',
                description: 'Solo para administradores',
            });
        }
    },
    async (req, res) => {
        try {
            const { id } = req.params;
            data.deleteById(id);
            res.json({ success: true, msj: 'Producto borrado' });
        } catch (error) {
            res.json({ error: true, msj: 'No se pudo borrar el Producto' });
        }
    }
);
/////////////////////////////////////////////////////////////////////////////////
console.log(isAdmin);
