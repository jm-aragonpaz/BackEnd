const express = require('express');
const app = express();
const { engine } = require("express-handlebars")
const Contenedeor = require('./classContainer.js');
const data = new Contenedeor('./productos.txt');
const PORT = process.env.PORT || 8080
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)
httpServer.listen(PORT, () => console.log('SERVER ON http://localhost: ' + PORT))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${port}`);
// });
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.engine('hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);


// app.get('/', (req, res) => {
//     // res.render('form');
//     res.render('form')
// })



app.post('/productos', async (req, res) => {
    const body = req.body;
    try {
        data.save(body);
        console.log(body);
        return res.redirect('/');
    } catch (error) {
        res.json({ error: true, msj: "No se pudo guardar el producto" });
    }
});


app.get('/', async (req, res) => {
    const listaProd = await data.getAll()
    if (listaProd) {
        console.log(listaProd)
        res.render("form", { productos: listaProd });
    } else {
        res.json({ error: true, msj: "No se pudo cargar la lista de productos" })
    }
});
