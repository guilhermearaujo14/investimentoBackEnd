const  conexao = require('../../../db/config');

async function getAllTipoAtivos(){
    const con = await conexao.createConnection();
    try {
        const TipoAtivos = await con.execute('SELECT * FROM TIPO_ATIVO');
        return TipoAtivos
    } catch (error) {
        return error
    }finally{
        conexao.closeConnection(con);
    }
}
module.exports = {
    getAllTipoAtivos
}