const express = require('express');
const app = express();
const { engine } = require("express-handlebars")
const Contenedeor = require('./classContainer.js');
const data = new Contenedeor('./productos.txt');
const port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
app.set('view engine', 'hbs');
app.set('view', './views');
app.engine('hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);


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
        res.render("server", { products: listaProd });
    } else {
        res.json({ error: true, msj: "No se pudo cargar la lista de productos" })
    }
});

// res.render('productsList.hbs', { products: productsHC, productsExist: true });
// app.get('/', (req, res) => {
//     res.send('<h1>Desafío 4: API RESTful</h1>');
// })

// routerProducts.delete('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         data.deleteById(id);
//         res.json({ success: true, msj: "Producto borrado" })
//     } catch (error) {
//         res.json({ error: true, msj: "No se pudo borrar el Producto" })
//     }
// });

// routerProducts.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, price, thumbnail } = req.body;
//         await data.updateById(title, price, thumbnail, id);
//         res.json({ succes: true })

//     } catch (error) {
//         res.json({ error: true, msj: "error, no se pudo actualizar el producto" });
//     }
// });

