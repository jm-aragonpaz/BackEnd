////@ts-check
// 0 conexion socket desde el front
const socket = io();
socket.on('connect', () => {
    console.log('Conectado a socket');
});

//2 envio del form por parte del usuario

const sendProd = () => {
    const title = document.getElementById('inputTitle').value;
    const price = document.getElementById('inputPrice').value;
    const thumbnail = document.getElementById('inputThumbnail').value;
    socket.emit('newProd', { title: title, price: price, thumbnail: thumbnail });
    //Limpio el form
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputPrice').value = '';
    document.getElementById('inputThumbnail').value = '';
    return;
};

const render = (data) => {
    let html = '';
    data.forEach((obj) => {
        html += `<tr>
                <td class='align-middle text-center'>${obj.title}</td>
                <td class='align-middle text-center'>${obj.price}</td>
                <td class='align-middle text-center'><img src='${obj.thumbnail}' width='50 height='auto' class='img-fluid/></td>
                </tr>`;
    });
    console.log(`html: ${html}`);
    document.getElementById('productos').innerHTML = html;
};

//obtengo desde el front los productos actualizados
socket.on('products', (data) => {
    console.log(`data: ${data}`);
    render(data);
});

//chat
const fyh = new Date().toLocaleDateString() + new Date().toTimeString();

const sendMsg = () => {
    const email = document.getElementById('input-email').value;
    const msgParaEnvio = document.getElementById('input-msg').value;
    socket.emit('newMsg', { email: email, date: fyh, msj: msgParaEnvio });
    document.getElementById('input-msg').value = '';
    return;
};

const chatRender = (data) => {
    let html = '';
    data.forEach((msg) => {
        html += `
        <li style='display: flex; flex=direction:row;'>
            <div id='author' style='font-weight:bold; color:blue;'>
                ${msg.email}<span style='color:brown; font-weight:normal; margin-left:5px;'>${fyh}</span>
            </div>
            <div id='msj' style='color:green; font-style:italic: margin-left:15px;'>
                ${msg.msj}
            </div>
        </li>`;
    });
    document.getElementById('fullChat').innerHTML = html;
};

socket.on('msgs', (data) => {
    chatRender(data);
});

socket.on('productsTest', (data) => {
    console.log('productos-test:' + data);
    let html = '';
    data.forEach((item) => {
        html += `
        <div class="products-card">
            <img src="${item.thumbnail}" class="product-img"/>
            <p>Producto: ${item.title}</p>
            <p>Precio: $ ${item.price}</p>
        </div>
        `;
    });
    document.getElementById('productsTest').innerHTML = html;
});
