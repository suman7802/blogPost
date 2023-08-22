require("dotenv").config();
const {Pool} = require("pg");

const {Client} = require("pg");
const pool = new Client({
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

// const pool = new Pool({
//   connectionString: process.env.DBConfigLink,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`connected to db successfully`);
  }
});

module.exports = pool;
