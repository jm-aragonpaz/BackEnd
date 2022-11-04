const express = require('express');
const Contenedor = require('./classContainer.js');
const app = express();
const { Router } = express;
const Contenedeor = require('./classContainer.js');
const data = new Contenedeor('./productos.txt');
const routerProducts = Router();
const port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
app.use('/api/productos', routerProducts);
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req,res)=>{
    res.send('<h1>Desafío 4: API RESTful</h1>');
})

routerProducts.get('/', async(req,res)=>{
    const products =await data.getAll()
    if(products){
        // console.log(products)
        res.send(products);
    }else{
        res.send({success: false, product: "No hay productos"});
        return console.log('no hay productos');
    }
})

routerProducts.get('/:id', async(req,res)=>{
    const {id} = req.params;
    const product = await data.getById(id);
    if (!product){
        res.json({error: true, msj: "id no encontrado"})
    }else{
        res.send({success: true, product: product});
    }
})

routerProducts.delete('/:id', async (req,res)=>{
    try{
    const {id}=req.params;
    data.deleteById(id);
    // const products = await conten
    res.json({success: true,msj:"Producto borrado"})
    }catch(error){
        res.json({error:true, msj:"No se pudo borrar el Producto"})
    }
});

routerProducts.post('/', async(req,res)=>{
    const body = req.body;
    try{
        data.save(body);
        console.log(body);
        res.send({success:true, msj: "Se guardo el producto correctamente"})
        // res.send({error:true,msj: "No se pudo guardar correctamente el producto"});
    }catch(error){
        res.json({error:true,msj:"No se pudo guardar el producto"});
    }
});

routerProducts.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        await data.updateById(title, price, thumbnail, id);
        res.json({ succes: true })

    } catch (error) {
        res.json({ error: true, msj: "error, no se pudo actualizar el producto" });
    }
});

app.get('/form', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/form', (req, res)=>{
    const body = req.body;
    data.save(body);
    res.send("gracias por compartir el producto")
    // res.json({error: true, e:err})
});