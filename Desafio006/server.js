//https://socket.io/docs/v4/server-initialization/
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const Contenedor = require('./classContainer.js');
const Contenedeor = require('./classContainer.js');
const data = new Contenedeor('./productos.txt');

//IMPLEMENTACION
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
httpServer.listen(PORT, () => console.log('SERVER ON http://localhost:' + PORT));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

let msgs = []
io.on('connection', async (socket) => {
    // msgs.push({
    //     socketid: socket.id,
    //     email: "",
    //     mensaje: 'se conecto ' + socket.id
    // });
    console.log('Se conecto un nuevo usuario')
    const products = await data.getAll();
    io.sockets.emit("Products", products);


    socket.on("product", async (product) => {
        // msgs.push({
        //     socketid: socket.id,
        //     email: data.email,
        //     mensaje: data.mensaje,
        //     // Agregar el campo date
        // })
        data.save(product)
        io.sockets.emit("Products", products);
    })

    socket.on('mensaje', async (msg) => {
        msgs.save(msg);
    });
    const msgsList = await msgs.getAll();
    io.sockets.emit('Historic', msgsList);
})
