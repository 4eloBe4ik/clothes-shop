const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'HALLEN0206',
  host: 'localhost',
  port: 5432,
  database: 'clothes-shop',
});

module.exports = pool;
