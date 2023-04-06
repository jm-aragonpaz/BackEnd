const { modelCart } = require('../models/modelCart.js');
const { modelProduct } = require('../models/modelProduct.js');
const mongoose = require('mongoose');

function validacionId(array, id) {
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

class ContenedorMongoDB {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async getAll() {
    const result = await this.model.find({});
    return result;
  }

  async getById(num) {
    const lista = await this.model.find({});
    const validacion = validacionId(lista, num);
    if (validacion) {
      let result = await this.model.find({ _id: num });
      result = result[0];
      return result;
    } else {
      return 'no existe el numero de id elegido';
    }
  }

  async save(title, price, thumbnail) {
    try {
      const newProduct = new this.model({
        title: title,
        price: price,
        thumbnail: thumbnail,
      });
      // console.log("newModel::", newProduct )
      const productSaved = await newProduct.save();
      console.log('productSaved:', productSaved);

      const aux = await this.model.find({ title: title });
      // console.log(aux)
      const id = aux[0]._id;
      return id;
    } catch {
      console.log('error al agregar producto!');
      return 'se ha producido un error';
    }
  }

  async update(id, timestamp, title, price, thumbnail) {
    const lista = await this.model.find({});
    const validacion = validacionId(lista, id);
    if (validacion) {
      await this.model.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            timestamp: timestamp,
            title: title,
            price: price,
            thumbnail: thumbnail,
          },
        }
      );
      const aux = await this.model.find({ _id: id });
      return `Se actualizo el producto ${aux[0].name}`;
    } else {
      return 'no existe el numero de id elegido';
    }
  }

  async deleteById(id) {
    const lista = await this.model.find({});
    const validacion = validacionId(lista, id);
    if (validacion) {
      await this.model.deleteOne({ _id: id });
      return `Se elimino con exito`;
    } else {
      return 'no existe el numero de id elegido';
    }
  }
  async newCart(username) {
    try {
      const newCart = new modelCart({
        username: username,
        productos: [],
      });
      await newCart.save();
      const aux = await modelCart.find({ username: uxsername });
      const id = aux[0]._id;
      return id;
    } catch {
      console.log('se ha producido un error');
      return 'se ha producido un error';
    }
  }

  async getProductsFromCart(idCart) {
    const lista = await this.model.find({});
    // console.log("lista:" , lista) // lista me trae object object en productos
    const index = lista.findIndex((object) => object.id == idCart);
    return lista[index].productos;
  }

  async addProductToCart(id, product) {
    const lista = await this.model.find({});
    const index = lista.findIndex((object) => object.id == id);
    lista[index].productos.push(product);
    await this.model.updateOne(
      { _id: id },
      {
        $set: {
          productos: lista[index].productos,
        },
      }
    );
  }

  async deleteProductFromCart(id, id_prod) {
    const lista = await this.model.find({});
    const index = lista.findIndex((object) => object.id == num);
    const indexProduct = lista[index].productos.findIndex((object) => object.id == id_prod);
    lista[index].productos.splice(indexProduct, 1);
    await this.model.updateOne(
      { _id: id },
      {
        $set: {
          productos: lista[index].productos,
        },
      }
    );
  }
}

module.exports = ContenedorMongoDB;
