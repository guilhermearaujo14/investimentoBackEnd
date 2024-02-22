require('dotenv/config');
const mysql = require('mysql2/promise');

const createConnection = async ()=>{
    const connection =  mysql.createConnection({
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,  // senha do banco de dados
        port:3306,
        database:process.env.DATABASE
 
    })
    return connection;
}
    
module.exports = createConnection;



/*
 host: 'db4free.net',
        user: 'guiaraujo',
        password: '33465506',  // senha do banco de dados
        port: 3306,
        database: 'despesaspessoais'
*/