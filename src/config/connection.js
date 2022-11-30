import mysql from "mysql2/promise"
import axios from 'axios'

// create the connection to database
var connection 

async function connect(){
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        Promise: axios.Promise
    });
}

connect()

export default connection
