import express from 'express';
import instancia from './src/daos/index.js';
const { Router } = express;
const routerCarrito = Router();

const carrito = new instancia.carrito();
const producto = new instancia.producto();

routerCarrito.get('/', async (req, res) => {
    const lista = await carrito.listarTodos('carritos');
    res.json(lista);
});

routerCarrito.get('/:id', async (req, res) => {
    let { id } = req.params;
    res.json(await carrito.listarPorId(id, 'carrito'));
});

routerCarrito.post('/', async (req, res) => {
    try {
        const timestampCarrito = moment().format('DD / MM/ YYYY, h:mm:ss');
        const idCarrito = await carrito.addCart(timestampCarrito);
        res.json(`Se creo un carrito nuevo don ic: ${idCarrito}`);
    } catch (error) {
        res.json('error', error);
    }
    // const { ...obj } = req.body;
    // let newCart = await carritos.save({ ...obj });
    // res.json({ saved: obj.id });
});

routerCarrito.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    let list = await carrito.getProductsFromCart(id);
    res.json(resultado);
    // if (id) {
    //     list = await carritos.listarPorID(id);
    // } else {
    //     list = await carritos.listAll();
    // }
    // res.json({ products: list });
});

routerCarrito.post('/:id/productos/:id_prod', async (req, res) => {
    try {
        let { id_prod } = req.params;
        let { id } = req.params;
        let productoParaCarrito = await producto.listarPorID(id_prod, 'productos');
        if (productoParaCarrito == 'No existe el numero de id seleccionado') {
            res.json('error: "No existe ningun carrito con el numero de id seleccionado"');
        } else if ((await carrito.listarPorID(id)) == 'No existe el numero de id seleccionado') {
            res.json('error: "No existe ningun carrito con el numero de id seleccionado"');
        } else {
            carrito.addProdToCart(id, productoParaCarrito, id_prod);
            res.json(`Se agrego el producto ${productoParaCarrito.name} al carrito`);
        }
    } catch (error) {
        res.json('error', error);
    }
    // const { id } = req.params;
    // let { ...newCart } = req.body;
    // let addedProd = await carritos.save(newCart);
});

routerCarrito.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let delCart = await carrito.delete(id, 'carritos');
    res.json({ delCart: delCart });
});

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    try {
        let { id_prod } = req.params;
        let { id } = req.params;
        let productoCarrito = await producto.listarPorID(id_prod, 'productos');
        if (productoCarrito == 'No existe el numero de id seleccionado') {
            res.json('error: "No existe ningun carrito con el numero de id seleccionado"');
        } else if ((await carrito.listarPorID(id)) == 'No existe el numero de id seleccionado') {
            res.json('error: "No existe ningun carrito con el numero de id seleccionado"');
        } else {
            carrito.delProdFromCart(id, productoCarrito, id_prod);
            res.json(`Se elimino el producto ${productoCarrito.name} al carrito`);
        }
    } catch (error) {
        res.json('error', error);
    }
    // const { id } = req.params;
    // const { id_prod } = req.params;
    // let delProd = await carritos.delProdFromCart(id, id_prod);
});

export default routerCarrito;
