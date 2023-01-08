//資料庫 用mysql2
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "192.168.35.8",
  user: process.env.DB_USER || "mountains",
  password: process.env.DB_PASS || "1214",
  database: process.env.DB_NAME || "hiking",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = pool.promise();


