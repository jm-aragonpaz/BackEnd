const socket = io();

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