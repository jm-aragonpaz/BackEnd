const express = require('express');
const app = express();
const PORT = 8080;
const { engine } = require('express-handlebars');
const { normalize, schema, denormalize } = require('normalizr');
const Contenedor = require('./container/contenedor');
const ContenedorMsg = require('./container/contenedorMsg');

//Productos fake
const genFakeProd = require('./utils/fakerProdGen');
const fakeP = genFakeProd(5);
// console.log(fakeP);

const moment = require('moment');
const { DatabaseModule } = require('@faker-js/faker');
const timeStamp = moment().format('hh:mm a');

const data = new Contenedor();
const dataMsg = new ContenedorMsg();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

httpServer.listen(PORT, () => console.log('Server on http://localhost:' + PORT));
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views/');
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);
console.log(`primer request`);
app.get('/', async (req, res) => {
    res.render('productList');
});
console.log(`segundo request`);
app.get('/api/productos-test', async (req, res) => {
    res.render('productList');
});
console.log(`Pase los request`);

//Normalizacion
//1. definir los schemas
const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' });
const messageSchema = new schema.Entity('messages', { author: authorSchema });
const chatSchema = new schema.Entity('chats', { messagges: [messageSchema] });
//2. aplicar la normalizacion
const normalizarData = (data) => {
    const dataNormalizada = normalize({ id: 'chatHistory', messages: data }, chatSchema);
    return dataNormalizada;
};
//3. Normaliza mensajes
const normalizarMensajes = async () => {
    const messages = await dataMsg.getAll();
    const normalizedMessages = normalizarMensajes(messages);
    return normalizedMessages;
};

//corre cuando se conecta un cliente

io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado con id: ${socket.id}`);

    //Muestra lista completa de productos al cliente
    socket.emit('msg-list', await normalizarMensajes());

    //recibe el producto del cliente
    socket.on('product', async (data) => {
        //guarda el producto nuevo en productos.json
        await datos.save(data);
        //muestra el msj por consola
        console.log(`Se recibio un nuevo producto:`, data);
        //Devuelve el historial completo de mensajes al cliente con el nuevo msj
        io.emit('product-list', await datos.getAll());
    });
    //Recibe el mensaje del cliente
    socket.on('msg', async (data) => {
        //Guaarda en msj nuevo en mensajes.json
        await dataMsg.save({ ...data, timestamp: timestamp });
        //Muestra el mensaje por consola
        console.log(`Se recibio un nuevo mensaje`, 'mag:', data);
        //Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
        io.sockets.emit('msg-list', await normalizarMensajes());
    });
});
