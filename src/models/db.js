require("dotenv").config();
// const mysql = require("mysql2");
const {Client} = require('pg')

const pool =new Client({
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`connected to db successfully`);
  }
});

module.exports = pool;
