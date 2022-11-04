const fs = require("fs")

class Contenedor {
    constructor(File) {
        this.file = File;
        
    }

    async save(product){
        try {
            // product.id = this.id++
            const data = await fs.promises.readFile(this.file, 'utf-8')
            // console.log(data)
            const dataParse = JSON.parse(data)
            // console.log(dataParse);
            const id = dataParse.length+1;
            // console.log(product);
            product.id=id
            dataParse.push(product);
            const dataStr=JSON.stringify(dataParse)
            await fs.promises.writeFile(this.file, dataStr)
            return id;    
        } catch (error) {
            console.log(error)
        }
        
    }


//Recibe un id y devuelve el objeto con ese id o null si no esta
    async getById(id){
        try {
            const data = await fs.promises.readFile(this.file,'utf-8');
            const items = JSON.parse(data);
            const product = items.find(e=>e.id==id);
            return product
        } catch (error) {
            console.log(error)
        }
    }
//Array con todos los objetos del archivo
    async getAll(){
        try {
            const data = await fs.promises.readFile(this.file,'utf-8');
            const products = JSON.parse((data));
            return products
        } catch (error) {
            console.log(error);
        }
    }
//Elimina el archivo con el id buscado
    async deleteById(id){
        try{
        const data = await fs.promises.readFile(this.file,'utf-8')
        const items = JSON.parse(data);
        const product = items.filter((e)=> e.id != id);
        const productStr = JSON.stringify(product);
        // items.splice(items.indexOf(product),1)
        // console.log(items)
        await fs.promises.writeFile(this.file, productStr)
        }catch(error){
            return console.log('Producto no encontrado')
        }
    }
//eliminar todos los objetos en el archivo
    async deleteAll(){
        try {
            const products=[]
            const productStr=JSON.stringify(products)
            await fs.promises.writeFile(this.file, productStr)
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(title,price,thumbnail,id){
        try{
            const products = await this.getAll();
            const product = products.find((item)=> item.id ==id)
            product.title=title;
            product.price=price;
            product.thumbnail=thumbnail;
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        }catch(error){
            console.log("No se pudo actualizar el producto")
        }
    }
}

module.exports = Contenedor;
