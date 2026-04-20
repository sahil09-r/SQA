const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'EXOTIC',
  port: 3306,
  user: 'root',
  password: 'Sahil',
  database: 'SQA',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
