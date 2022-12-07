const { optionsSQL } = require('./options/mysql.js');
const knex = require('knex')(optionsSQL);

knex.schema
    .createTable('productos', (table) => {
        table.increments('id'), table.string('title'), table.integer('price'), table.string('description'), table.string('category'), table.string('pictureUrl');
    })
    .then(() => {
        console.log('todo bien');
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    });

knex('productos')
    .insert({
        title: 'IronSet',
        price: 700,
        thumbnail: 'https://www.titleist.com/dw/image/v2/AAZW_PRD/on/demandware.static/-/Sites-titleist-clubs-master/default/dwe6b25fca/541C/541C_01.jpg?sw=300&sh=300&sm=fit&sfrm=png',
    })
    .then(() => {
        console.log('logré insertar');
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        knex.destroy();
    });
/*
knex.from("productos")
.where("id", "=", 1)
.del()
.catch((e)=>{
    console.log(e)
}).finally(()=>{
    knex.destroy()
})

*/
