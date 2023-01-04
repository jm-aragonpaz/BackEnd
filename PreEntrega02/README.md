# BackEnd

## Rutas disponibles:

### /api/productos

#### GET

-   `'/:id?'`: Devuelve el producto con el id solicitado.
-   `'/'`: Devuelve una lista de los productos disponibles.

#### POST

-   `'/'`: Permite crear un nuevo producto en el servidor.

#### PUT

-   `'/:id'`: Permite modificar el producto del id en cuestion.

#### DELETE

-   `'/:id'`: Permite borrar un producto segun el id indicado.

### /api/carrito

#### GET

-   `'/:id/productos'`: Devuelve listado de productos del carrito con el id solicitado.

#### POST

-   `'/'`: Crea un carrito nuevo, le asigna id y timestamp, junto con un array con los productos incorporados al mismo.
-   `'/:id/productos/'`: Busca el carrito con el id indicado y le agrega los productos que se mandan en el body de la request.

#### DELETE

-   `'/:id'`: Permite borrar el carrito con el id indicado.
-   `'/:id/productos/:id_prod'`: Elimina el producto con id_prod dentro del carrito que posee el identificador id.
