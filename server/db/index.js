const { Pool }  = require('pg');

const pool = new Pool({
    user: "postgres",
    password: process.env.PSQL_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "boomv1"
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};