const express = require('express');
const handlebars = require('express-handlebars');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

//productos
const { optionsSQL } = require('./options/mysql.js');
//mensajes
const { optionsSQLITE } = require('./options/sqlite.js');

const Contenedor = require('./clase-contenedor.js');
const arrayProductos = new Contenedor(optionsSQL, 'productos');
const Mensajes = new Contenedor(optionsSQLITE, 'db-mensajes');

app.use(express.static('views'));

//*HANDLEBARS
app.set('views', './views/');
const hbs = handlebars.engine({
    extname: 'hbs',
    layoutsDir: './views/layouts/',
});
app.engine('hbs', hbs);

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const listaProductos = await arrayProductos.getAll();
    if (listaProductos) {
        res.render('main', {
            layout: 'vista-productos',
            productos: listaProductos,
        });
    } else {
        res.render('main', { layout: 'error' });
    }
});

//*WEBSOCKET para tabla de productos
//'1) conexión del lado del servidor
io.on('connection', async (socket) => {
    console.log(`io socket conectado ${socket.id}`);
    socket.emit('mensajes', await Mensajes.getAll());
    socket.emit('productos', await arrayProductos.getAll());

    //' 3) escuchar un mensaje de un cliente (un objeto de producto)
    socket.on('new_prod', async (data) => {
        await arrayProductos.save(data);
        const listaActualizada = await arrayProductos.getAll();

        //' 4) y propagarlo a todos los clientes: enviar mensaje a todos los usuarios conectados: todos pueden ver la tabla actualizada en tiempo real
        io.sockets.emit('productos', listaActualizada);
    });

    //*WEBSOCKET para recibir y guardar nuevo mensaje, y enviar el array de mensajes a todos los usuarios conectados
    socket.on('new_msg', async (data) => {
        await Mensajes.save(data);
        const listaMensajes = await Mensajes.getAll();
        io.sockets.emit('mensajes', listaMensajes);
    });
});

httpServer.listen(8080, () => {
    console.log('servidor de express iniciado');
});
