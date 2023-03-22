import dotenv from 'dotenv';

dotenv.config();

// const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
// const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'portfolio';
// const MYSQL_USER = process.env.MYSQL_HOST || 'root';
// const MYSQL_PASS = process.env.MYSQL_HOST || '';
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const MYSQL = {
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USERNAME,
    pass: DB_PASSWORD
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;
