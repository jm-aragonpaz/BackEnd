/* requires */
const express = require('express');
const app = express();
const PORT = 8080;
const { engine } = require('express-handlebars');
const { normalize, schema, denormalize } = require('normalizr');
const Contenedor = require('./container/contenedor');
const ContenedorMsg = require('./container/contenedorMsg');

/* Generar productos fake */
const generateFakeProducts = require('./utils/fakerProductGenerator');
const FakeP = generateFakeProducts(5);

const moment = require('moment');
const timestamp = moment().format('h:mm a');

const datas = new Contenedor();
const dataMsg = new ContenedorMsg();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implementacion del server con socket
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

httpServer.listen(PORT, () => console.log('SERVER ON http://localhost:' + PORT));

app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);

app.get('/', async (req, res) => {
    res.render('productslist');
});

/* Ruta que pide el desafío */
app.get('/api/productos-test', async (req, res) => {
    res.render('productslist');
});

/* Normalizacion */

// 1. Definir esquemas

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' });
const messageSchema = new schema.Entity('messages', {
    author: authorSchema,
});

const chatSchema = new schema.Entity('chats', {
    messages: [messageSchema],
});

// 2. Aplicar Normalizacion (funcion que normaliza datos)

const normalizarData = (data) => {
    const dataNormalizada = normalize({ id: 'chatHistory', messages: data }, chatSchema);
    return dataNormalizada;
};

// 3. Normaliza mensajes

const normalizarMensajes = async () => {
    const messages = await dataMsg.getAll();
    const normalizedMessages = normalizarData(messages);
    return normalizedMessages;
};

// Corre cuando se conecta un cleinte
io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);

    // Muestra la lista completa de productos al cliente
    socket.emit('product-list', await FakeP);

    // Muestra el historial completo de mensajes al cliente
    socket.emit('msg-list', await normalizarMensajes());

    // Recibe prodcuto del cliente
    socket.on('product', async (data) => {
        // Guarda el producto nuevo en productos.json
        await datas.save(data);

        // Muestra el mensaje por consola
        console.log('Se recibio un producto nuevo', 'producto:', data);

        // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
        io.emit('product-list', await datas.getAll());
    });

    // Recibe mensaje del cliente
    socket.on('msg', async (data) => {
        // Guarda en mensaje nuevo en mensajes.json
        await dataMsg.save({ ...data, timestamp: timestamp });

        // Muestra el mensaje por consola
        console.log('Se recibio un msg nuevo', 'msg:', data);

        // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
        io.sockets.emit('msg-list', await normalizarMensajes());
    });
});
