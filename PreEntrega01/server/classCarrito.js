const fs = require('fs');

module.exports = class Carrito {
    constructor(File) {
        this.file = File;
    }

    async newCart(product) {
        try {
            // product.id = this.id++
            const data = await fs.promises.readFile(this.file, 'utf-8');
            const cartParse = JSON.parse(data);
            let timestamp = Date.now();
            const newCart = {
                id: cartParse.length + 1,
                timestamp: timestamp,
                products: [product],
            };
            // product.timestamp = new Date(Date.now());
            // product.id = id;
            cartParse.push(newCart);
            const dataStr = JSON.stringify(cartParse);
            await fs.promises.writeFile(this.file, dataStr);
            return newCart.id;
        } catch (error) {
            console.log('Se produjo un error', error);
        }
    }

    //Recibe un id y devuelve el objeto con ese id o null si no esta
    async deleteCartById(id) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8');
            const cartParse = JSON.parse(data);
            const cart = cartParse.filter((element) => element.id != id);
            const newCart = JSON.stringify(cart);
            await fs.promises.writeFile(this.file, newCart);
        } catch (error) {
            console.log('Se produjo un error', error);
        }
    }
    //Array con todos los objetos del archivo
    async getProdById(id) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8');
            const carts = JSON.parse(data);
            let cart = carts.find((element) => element.id == id);
            if (cart) {
                return cart.products;
            } else {
                console.log('Carrito no encontrado');
            }
        } catch (error) {
            console.log('Se produjo un error', error);
        }
    }
    //Elimina el archivo con el id buscado
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8');
            const items = JSON.parse(data);
            const product = items.filter((e) => e.id != id);
            const productStr = JSON.stringify(product);
            // items.splice(items.indexOf(product),1)
            // console.log(items)
            await fs.promises.writeFile(this.file, productStr);
        } catch (error) {
            return console.log('Producto no encontrado');
        }
    }
    //Icorporar productos al carrito
    async addProdToCart(id, newProd) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8');
            console.log(data);
            const carts = JSON.parse(data);
            console.log(carts);
            let cart = carts.find((element) => element.id == id);
            if (cart) {
                let oldProd = cart.products;
                let addProd = oldProd.concat(newProd);
                let updCart = { ...cart, products: addProd };
                let newCarts = carts.map((element) => {
                    if (element.id == id) {
                        console.log('entro aca');
                        return { ...updCart };
                    } else {
                        return element;
                    }
                });
                console.log('llego aca L90.');
                const strNewCarts = JSON.stringify(newCarts);
                let writeNewCarts = await fs.promises.writeFile(this.file, strNewCarts);
            } else {
                console.log('Carrito no encontrado');
            }
        } catch (error) {
            console.log('Se produjo un error', error);
        }
    }
    //         const products = await this.getAll();
    //         const product = products.find((item) => item.id == id);
    //         product.title = title;
    //         product.price = price;
    //         product.thumbnail = thumbnail;
    //         console.log(products, this.file);
    //         await fs.promises.writeFile(this.file, JSON.stringify(products));
    //         console.log('Se actualizo el producto');
    //     } catch (error) {
    //         console.log('No se pudo actualizar el producto');
    //     }
    // }
    //eliminar todos los objetos en el archivo
    async delProdFromCart(id, id_prod) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8');
            const carts = JSON.parse(data);
            let cart = carts.find((element) => element.id == id);
            if (cart) {
                let oldProd = cart.products;
                let delProd = oldProd.filter((el) => el.id == id_prod);
                let updCart = { ...cart, products: delProd };
                let newCarts = carts.map((element) => {
                    if (element.id == id) {
                        return { ...updCart };
                    } else {
                        return element;
                    }
                });
                const strNewCarts = JSON.stringify(newCarts);
                let writeNewCarts = await fs.promises.writeFile(this.file, strNewCarts);
            } else {
                console.log('Carrito no encontrado');
            }
        } catch (error) {
            console.log('Se produjo un error', error);
        }
    }
};
