//FRONTEND
//' conexión del socket del lado del cliente
const socket = io.connect();

function render(data) {
    //por cada objeto de producto ingresado crear una row en la tabla con la información:
    const html = data
        .map(
            (msg) =>
                `
        <tr>
            
            <td rowspan="1" colspan="10" style=" font-weight:normal;  padding:5px; ">
            ${msg.title}
            </td >
            <td rowspan="1" colspan="20" style=" font-weight:normal;  padding:5px;">
            $ ${msg.price}
            </td>
            <td rowspan="1" colspan="20" style=" font-weight:normal;  padding:5px;">
            ${msg.description}
            </td>
            <td rowspan="1" colspan="10" style=" font-weight:normal; padding:5px;">
              <img src="${msg.pictureUrl}" height="100px">
            </td>
        </tr>
      `
        )
        .join(' ');
    document.getElementById('productos').innerHTML = html;
}

function renderChat(data) {
    //por cada objeto de producto ingresado crear una row en la tabla con la información:
    const html = data
        .map(
            (msg) =>
                `
        <li style="display: flex; flex-direction:row; ">
            <div id="autor" style="font-weight: bold; color:blue;" >
                ${msg.autor} <span style="color: brown; font-weight:normal; margin-left:5px;">  ${msg.fecha}  :</span> 
            </div>
            <div id="msj"  style="color: green; font-style: italic; margin-left:15px;">
               ${msg.msj}
            </div>
        </li>
      `
        )
        .join(' ');
    document.getElementById('chatCompleto').innerHTML = html;
}

//' 2) Cliente envía llena el form con un nuevo producto: el evento es onclick en btn Enviar en vista-productos.hbs
function enviarProducto() {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const pictureUrl = document.getElementById('pictureUrl').value;
    socket.emit('new_prod', {
        title: title,
        price: price,
        category: category,
        pictureUrl: pictureUrl,
    });
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
    document.getElementById('pictureUrl').value = '';
    return false;
}

function enviarMensaje(event) {
    const fecha = new Date().toLocaleDateString() + ' ' + new Date().toTimeString();
    const nombre = document.getElementById('nombre').value;
    const msj = document.getElementById('chat_mensaje').value;
    if (nombre) {
        socket.emit('new_msg', { autor: nombre, msj: msj, fecha: fecha });
        document.getElementById('chat_mensaje').value = '';
        return false;
    } else {
        alert('Debe ingresar su email');
    }
}

//' 5) escuchar al servidor que integró al nuevo prod en el array de productos y mostrarlo
socket.on('productos', (data) => {
    render(data);
});

socket.on('mensajes', (data) => {
    renderChat(data);
});
