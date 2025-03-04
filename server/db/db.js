const { Pool } = require('pg');

const pool = new Pool({
  user: 'appuser',
  password: 'P1yClcgal5FJzpp3GCGNhXrRPYBA7hhn',
  host: 'dpg-cuvk7qrtq21c73bu9feg-a.oregon-postgres.render.com',
  port: 5432,
  database: 'capstone',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};