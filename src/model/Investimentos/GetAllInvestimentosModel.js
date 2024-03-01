const conexao = require('../../../db/config')


    
  async function getAllInvestimentos(){
        try {
            const con = await conexao.createConnection();
            const [investimentos] = await con.execute('SELECT * FROM INVESTIMENTOS')
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
