const express = require('express');
const app = express();
const ejs = require('ejs');
const Contenedeor = require('./classContainer.js');
const data = new Contenedeor('./productos.txt');
const port = process.env.PORT || 8084

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render('form');
})



app.post('/productos', async (req, res) => {
    const body = req.body;
    try {
        data.save(body);
        console.log(body);
        res.send({ success: true, msj: "Se guardo el producto correctamente", body })
    } catch (error) {
        res.json({ error: true, msj: "No se pudo guardar el producto" });
    }
});

app.post('/productos', (req, res) => {
    const body = req.body;
    data.save(body);
    res.send("gracias por compartir el producto")
    return res.redirect('/');
});

app.get('/productos', async (req, res) => {
    const listaProd = await data.getAll()
    if (listaProd) {
        console.log(listaProd)
        res.render("productsList", { productos: listaProd });
    } else {
        res.json({ error: true, msj: "No se pudo cargar la lista de productos" })
    }
});

