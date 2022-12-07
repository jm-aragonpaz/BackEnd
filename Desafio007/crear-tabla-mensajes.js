const { optionsSQLITE } = require("./options/sqlite.js");
const knex = require("knex")(optionsSQLITE);

knex.schema
  .createTable("db-mensajes", (table) => {
    table.string("autor"), table.string("msj"), table.string("fecha");
  })
  .then(() => {
    console.log("Success");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  });

//prueba:
let fecha = new Date().toLocaleDateString() + new Date().toTimeString();

knex("db-mensajes")
  .insert({ autor: "Pipo", msj: "Hola mundo", fecha: fecha })
  .then(() => {
    console.log("Registro exitoso");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
