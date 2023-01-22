const { Pool } = require('pg');

const PgPool = require('pg').Pool;

const pool = new PgPool({
    user: "postgres",
    password: "hammad123",
    database: "api_database",
    host: "localhost",
    port: 5432
});

module.exports = pool;