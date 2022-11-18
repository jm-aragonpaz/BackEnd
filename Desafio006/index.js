const socket = io();

socket.on("connect", () => {
    console.log("me conecte");
})
socket.on('msg', (data) => {
    console.log(data)
});

socket.on('msg-list', (data) => {
    console.log("msg-list", data);
    let html = '';
    data.forEach((obj) => {
        html += `
        <div>
        (${obj.socketid}) ${obj.email} dijo: ${obj.mensaje}
        </div>
        `
    });
    document.getElementById("div-list-msgs").innerHTML = html;
});


function enviarMsg() {
    const msgParaEnvio = document.getElementById('input-msg').value;
    const email = document.getElementById('input-email').value;
    socket.emit("msg", { email: email, mensaje: msgParaEnvio })
}



socket.on('Products', (products) => {
    let table = document.getElementById('padre');
    let html = `
    <tr>
    <th>#</th>
    <th>Title</th>
    <th>Price</th>
    <th>Image</th>
    </tr>
    `;
    products.forEach((item) => {
        html += `
        <tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td><img src=${item.thumbnail}/></td>
        </tr>
        `
    })
    table.innerHTML = html;
})

socket.on('Historic', (msgsList) => {
    let padre = document.getElementById('chat');
    let html = ` `;
    msgsList.forEach((item) => {
        html += `<p>${item.email} [${item.date}] : ${item.msg}</p>`
    })
    padre.innerHTML = html;
})

function enviarForm() {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const url = document.getElementById('url').value;
    socket.emit('product', { title: title, price: price, thumbnail: url });
    return false;
}

function enviarMsg() {
    const email = document.getElementById('email').value;
    const msg = document.getElementById('msg').value;
    const today = Date.now();
    const date = new Date(today);
    const dateFormat = date.toLocaleString();
    socket.emit('info-msg', { email: email, msg: msg, date: dateFormat });
    return false;
}