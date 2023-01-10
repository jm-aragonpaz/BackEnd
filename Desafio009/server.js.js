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
const timeStamp = moment().format('hh:mm a');

const data = new Contenedor();
const dataMsg = new ContenedorMsg();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

httpServer.listen(PORT, () => console.log('Server on http://localhost:' + PORT));
app.use('/public', express.static(__dirname + '/public'));
