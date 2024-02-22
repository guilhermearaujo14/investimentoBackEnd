const conexao = require('../../../db/config')


    
  async function getAllInvestimentos(){
        try {
            const con = await conexao();
            const [investimentos] = await con.execute('SELECT * FROM INVESTIMENTOS')
            return await investimentos
        } catch (error) {
            return 'ERROR: '+error
        }
       
    }





module.exports = {
    getAllInvestimentos
};
