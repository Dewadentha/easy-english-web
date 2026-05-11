const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection()
  .then(() => {
    console.log("✅ CONNECT:", process.env.DB_NAME);
  })
  .catch(err => {
    console.log(err);
  });

module.exports = pool;