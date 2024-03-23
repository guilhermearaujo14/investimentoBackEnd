const { json } = require('express');
const conexao = require('../../../db/config')
const {Investimento} = require('./Investimento');

    
  async function getAllInvestimentos(){
      const con = await conexao.createConnection();
        try {
            const [investimentos] = await con.execute('SELECT * FROM INVESTIMENTOS WHERE USUARIO_ID = 1')
            return await investimentos
        } catch (error) {
            return 'ERROR: '+error
        }finally{
            conexao.closeConnection(con);
        }
       
    }





module.exports = {
    getAllInvestimentos
};
