const express = require('express');
const app = express();
const { Router } = express;
const routerProducts = Router();
const routerCart = Router();
const Contenedor = require('./classContainer.js');
const productos = new Contenedor('./productos.txt');
const cart = new Contenedor('./carrito.txt');

//Defino puertos de interacción
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App de PreEntrega 001 escuchando en el puerto http://localhost:${port}`);
});
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

//Ruta no disponible
app.get('/*', (req, res) => {
    res.json({ titulo: 'PreEntrega 001', curso: 'BackEnd', rutas_disponibles: { productos: '/api/productos', carrito: '/api/carrito' } });
});

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
//POST
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

////////////////////////////////////////////////////////////////////////////////
//CARRITO
//Crear carrito
routerCart.post('/', (req, res) => {
    //Crear carrito
});
//Borrar carrito
routerCart.delete('/:id', (req, res) => {
    //Vacia carrito y lo elimina
});
routerCart.get('/:id/productos', (req, res) => {
    //Lista todos los productos del carrito
});
routerCart.post('/:id/productos', (req, res) => {
    //Incorpora productos al carrito por su id de producto (ojo)
});
routerCart.delete('/:id/productos/:id_prod', (req, res) => {
    //Borra un elemento del carrito segun su id de producto.
});
