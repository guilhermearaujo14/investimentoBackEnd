require('dotenv/config');
const mysql = require('mysql2/promise');

const createConnection = async ()=>{
    try { 
        const connection =  mysql.createConnection({
            host:process.env.HOST,
            user:process.env.USER,
            password:process.env.PASSWORD,  // senha do banco de dados
            port:3306,
            database:process.env.DATABASE
     
        })
    return connection;
    } catch (error) {
        console.log(error)
        throw new Error('Ops... não foi possivel conectar'+error)
    }
    
}

const closeConnection = (connection)=>{
    connection.end();
}
    
module.exports = {
    createConnection,
    closeConnection

};



/*
 host: 'db4free.net',
        user: 'guiaraujo',
        password: '33465506',  // senha do banco de dados
        port: 3306,
        database: 'despesaspessoais'
*/