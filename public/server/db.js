// db.js
const { Pool } = require('pg');

// Connect to your PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'minty',
  password: process.env.DB_PASSWORD || 'Lav-111705!',
  port: process.env.DB_PORT || 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('database connection error:', err);
  } else {
    console.log('database connected successfully');
  }
});

module.exports = pool;