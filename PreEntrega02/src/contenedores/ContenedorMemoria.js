import productosRouter from '../../productos.js';

class ContenedorMemoria {
    constructor() {
        this.productos = [
            {
                id: 1,
                timestamp: '3 / 01 / 2023, 20:17:50',
                name: 'Driver',
                description: 'Driver Titleist',
                code: '001',
                imgUrl: 'sadfasdfsdf',
                price: 300,
                stock: 12,
            },
            {
                id: 2,
                timestamp: '28 / 12 / 2022, 19:34:30',
                name: 'Putter',
                description: 'Scotty Cameron Newport 2',
                code: '002',
                imgUrl: 'svsdfvsdfvsdf',
                price: 250,
                stock: 10,
            },
        ];
        this.carritos = [
            {
                id: 1,
                timestampCarrito: '04 / 01 /2023, 19:23:45',
                productos: [
                    {
                        id: 1,
                        timestamp: '3 / 01 / 2023, 20:17:50',
                        name: 'Driver',
                        description: 'Driver Titleist',
                        code: '001',
                        imgUrl: 'sadfasdfsdf',
                        price: 300,
                        stock: 12,
                    },
                    {
                        id: 2,
                        timestamp: '28 / 12 / 2022, 19:34:30',
                        name: 'Putter',
                        description: 'Scotty Cameron Newport 2',
                        code: '002',
                        imgUrl: 'svsdfvsdfvsdf',
                        price: 250,
                        stock: 10,
                    },
                ],
            },
        ];
    }
    listarTodos(list) {
        if (list == 'productos') {
            return this.productos;
        } else if (list == 'carritos') {
            return this.carritos;
        } else {
            return 'No existe la lista seleccionda';
        }
    }

    listarPorId(id, list) {
        try {
            let lista;
            if (list == 'productos') {
                lista = this.productos;
            } else if (list == 'carrito') {
                lista = this.carritos;
            } else {
                return 'No existe la lista seleccionada';
            }
            const index = lista.findIndex((object) => object.id == id);
            if (lista[index]) {
                return lista[index];
            } else {
                return 'No existe el id seleccionado';
            }
        } catch (error) {
            console.log('Se produjo un error');
            return 'Se ha producido un error';
        }
    }

    async save(ob) {
        try {
            const lista = await this.productos;
            let idMax = Math.max(...lista.map((el) => el.id));
            let id = idMax + 1;
            let prodNew = {
                id: id,
                timestamp: ob.timestamp,
                name: ob.name,
                description: ob.description,
                code: ob.code,
                imgUrl: ob.imgUrl,
                price: ob.price,
                stock: ob.stock,
            };
            this.productos.push(prodNew);
            return id;
        } catch (error) {
            console.log('Se ha producido un error al guardar');
            return 'Se ha producido un error al guardar';
        }
    }

    async update(id, objeto) {
        try {
            const lista = this.productos;
            const index = lista.findIndex((object) => object.id == id);
            if (lista[index]) {
                const prodNew = {
                    id: id,
                    timestamp: objeto.timestamp,
                    name: objeto.name,
                    description: objeto.description,
                    code: objeto.code,
                    imgUrl: objeto.imgUrl,
                    price: objeto.price,
                    stock: objeto.stock,
                };
                this.productos[index] = prodNew;
                return `Se actualizo el producto ${prodNew.name}`;
            } else {
                return 'No existe el id seleccionado';
            }
        } catch (err) {
            console.log('Se produjo un error al actualizar el producto');
            return 'Se ha producido un error';
        }
    }

    async delete(id, list) {
        try {
            let lista;
            if (list == 'productos') {
                lista = this.productos;
            } else if (list == 'carrito') {
                lista = this.carritos;
            } else {
                return 'No existe la lista';
            }
            const index = lista.findIndex((object) => object.id == id);
            if (lista[index]) {
                if (list == 'productos') {
                    this.productos.splice(index, 1);
                    return `Se elimino con exito`;
                } else if (list == 'carritos') {
                    this.carritos.splice(index, 1);
                    return `Se elimino con exito`;
                }
            } else {
                return 'No existe el numero de id seleccionado';
            }
        } catch (err) {
            console.log('Se ha producido un error');
            return 'Se ha producido un error';
        }
    }

    async addCart(timestampCarrito) {
        try {
            const lista = this.carritos;
            let idCarrito;
            if (lista.length > 0) {
                let idMax = Math.max(...lista.map((el) => el.id));
                idCarrito = idMax + 1;
            } else {
                idCarrito = 1;
            }
            let cartNew = {
                id: idCarrito,
                timestampCarrito: timestampCarrito,
                productos: [],
            };
            this.carritos.push(cartNew);
            return idCarrito;
        } catch (error) {
            console.log('Se produjo un error');
            return 'Se produjo un error';
        }
    }

    async getProductFromCart(id) {
        try {
            const lista = this.carritos;
            const index = lista.findIndex((object) => object.id == id);
            if (index) {
                return lista[index].productos;
            } else {
                return 'No existe el id de carrito seleccionado';
            }
        } catch (error) {
            console.log('Se produjo un error');
            return 'Se produjo un error';
        }
    }

    async addProdToCart(id, producto) {
        const lista = this.carritos;
        const index = lista.findIndex((object) => object.id == id);
        lista[index].productos.push(producto);
    }
    async delProdFromCart(id, productoCarrito, id_prod) {
        const lista = this.carritos;
        const index = lista.findIndex((object) => (object.id = id));
        const indexProduct = lista[index].productos.findIndex((object) => object.id == id_prod);
        this.carritos[index].productos.splice(id_prod, 1);
    }
}

export default ContenedorMemoria;
