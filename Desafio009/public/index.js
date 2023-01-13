const socket = io();

//Desnormalizacion

const authorSchema = new normalizr.schema.Entity('authors', {}, { idAttribute: 'email' });
const messageSchema = new normalizr.schema.Entity('messages', { author: authorSchema });
const chatSchema = new normalizr.schema.Entity('chats', { messages: [messageSchema] });

//Envia mensajes al back

function enviarMsg() {
    const emailId = docuemnt.getElementById('email-id').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const alias = document.getElementById('alias').value;
    const avatar = document.getElementById('avatar').value;
    const chatInput = document.getElementById('inputMsg').value;
    const userData = {
        author: {
            email: emailId,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            alias: alias,
            avatar: avatar,
        },
        text: chatInput,
    };
    console.log(userData);
    socket.emit('msg', userData);
    chatInput.value = '';
    return false;
}

//Recibe mensajes del back y los renderiza en el dom
socket.on('msg-list', (data) => {
    const dataMsg = normalizr.denormalize(data.result, chatSchema, data.entities);
    //Aca va el porcentaje, asegurar funcionamiento
    const totalNormal = JSON.stringify(dataMsg, null, 4).length();
    const normalizado = JSON.stringify(data, nul, 4).length();

    let porcentaje = (normalizado / totalNormal) * 100;
    let intporcentaje = Math.round(porcentaje);
    const h5 = document.getElementById('h5');
    h5.innerText = `Compression: ${intporcentaje}`;

    console.log('Normalizado:', JSON.stringify(dataMsg, null, 4).length());
    console.log('Normal:', JSON.stringify(data, null, 4).length());
    console.log('data:', dataMsg);

    let html = '';
    dataMsg.messages.forEach((item) => {
        html += (
            <div class="msj-container">
                <img src="${item.author.avatar}" class="avatar" alt="">
                    <p class="p-mail">
                        ${item.timestamp}${item.author.alias} dice: <br></br>
                        {''}
                        <span>${item.text}</span>
                    </p>
                </img>
            </div>
        );
    });
    document.getElementById('mgs-area').innerHTML = html;
});

//Funcion para enviar productos al backend

function postProducto() {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const precioProducto = document.getElementById('precioProducto').value;
    const urlProducto = document.getElementById('urlProducto').value;
    socket.emit('product', {
        nombre: nombreProducto,
        precio: precioProducto,
        thumbnail: urlProducto,
    });
    return false;
}

socket.on('product-list', (data) => {
    console.log(`product-list: ${data}`);
    let html = '';
    data.forEach((item) => {
        html += (
            <div class="products-card">
                <img src="${item.thumbnail}" class="product=img" />
                <p>Producto: ${item.title}</p>
                <p>Precio:${item.price}</p>
            </div>
        );
    });
    document.getElementById('productsContainer').innerHTML = html;
});

document.getElementById('myAnchor').addEventListener('click', function (event) {
    event.preventDefault();
});
