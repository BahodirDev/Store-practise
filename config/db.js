const pg = require('pg').Pool;
const dot = require('dotenv');
dot.config();

const pool = new pg({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const queryBuilder = async (query, ...arr) => {
    try {
       const data =  await pool.query(query,arr);
       return data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = queryBuilder;
