# BackEnd

Glitch project link
[Glitch](https://star-coconut-monday.glitch.me/)

## Rutas disponibles:

### /api/productos

#### GET

- `'/:id?'`: Devuelve el producto con el id solicitado.
- `'/'`: Devuelve una lista de los productos disponibles.

#### POST

- `'/'`: Depende de que la variable isAdmin sea true. Permite crear un nuevo producto en el servidor.

#### PUT

- `'/:id'`: Depende del valor de isAdmin, al igual que POST. Permite modificar el producto del id en cuestion.

#### DELETE

- `'/:id'`: Depende del valor de isAdmin, de igual manera que para POUST y PUT. Permite borrar un producto segun el id indicado.

### /api/carrito

#### GET

- `'/:id/productos'`: Devuelve listado de productos del carrito con el id solicitado.

#### POST

- `'/'`: Crea un carrito nuevo, le asigna id y timestamp, junto con un array con los productos incorporados al mismo.
- `'/:id/productos/'`: Busca el carrito con el id indicado y le agrega los productos que se mandan en el body de la request.

#### DELETE

- `'/:id'`: Permite borrar el carrito con el id indicado.
- `'/:id/productos/:id_prod'`: Elimina el producto con id_prod dentro del carrito que posee el identificador id.
