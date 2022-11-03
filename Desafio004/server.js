const express = require('express');
const app = express();
const { Router } = express;
const Contenedeor = require('./classContainer.js');
const data = new Contenedeor();
const routerProducts = Router();
const port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
app.use('/api/usuarios', routerProducts);
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req,res)=>{
    res.send('<h1>Desafío 4: API RESTful</h1>');
})

routerProducts.get('/', async(req,res)=>{
    const products =await data.getAll()
    if(products){
        res.send(products);
    }else{
        return console.log('no hay productos');
    }
})

routerProducts.get('/:id', async(req,res)=>{
    const {id} = req.params;
    const product = await data.getById(id);
    const products = await data.getAll()
    if (!product){
        res.json({error: true, msj: "id no encontrado"})
    }else{
        res.send({success: true, product: product});
    }
})

routerProducts.delete('/:id', async (req,res)=>{
    try{
    const {id}=req.params;
    const products = await conten
    }catch(error){
        res.json({error:true, msj:"No se pudo borrar el Producto"})
    }
});

routerProducts.post('/', async(req,res)=>{
    const {body}= req;
    try{
        data.save(body);
        res.send({success:true, msj: "Se guardo el producto correctamente"})
    }catch{
        res.send({error:true,msj: "No se pudo guardar correctamente el producto"});
    }
});

routerProducts.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, thumbnail } = req.body;
        await data.updateById(id, nombre, precio, thumbnail);
        res.json({ succes: true })

    } catch (error) {
        res.json({ error: true, msj: "error, no se pudo actualizar el producto" });
    }
});
