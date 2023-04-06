////@ts-check
// const config = require("dotenv");
require("dotenv").config();
MONGO = process.env.MONGO;
// console.log(process.env.MONGO);
module.exports = { MONGO };
