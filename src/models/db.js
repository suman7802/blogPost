require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.SQL_PORT,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`connected to db successfully`);
  }
});

module.exports = connection;
