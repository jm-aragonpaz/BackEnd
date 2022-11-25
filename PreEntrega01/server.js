const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
// const { Router } = express;
// const Contenedor = require('./server/classProd.js');
// const productos = new Contenedor('./productos.txt');
// const cart = new Contenedor('./carrito.txt');
//Defino puertos de interacción

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(port, () => {
    console.log(`App de PreEntrega 001 escuchando en el puerto http://localhost:${port}`);
});

const cors = require('cors');
app.use(cors({ origin: '*' }));

const routerProducts = require('./server/productos.js');
app.use('/api/productos', routerProducts);

const routerCart = require('./server/carrito.js');
app.use('/api/carrito', routerCart);

//Ruta no disponible
app.get('/*', (req, res) => {
    res.json({ titulo: 'PreEntrega 001', curso: 'BackEnd', rutas_disponibles: { productos: '/api/productos', carrito: '/api/carrito' } });
});
