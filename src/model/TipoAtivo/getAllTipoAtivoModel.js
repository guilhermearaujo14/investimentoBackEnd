const  conexao = require('../../../db/config');

async function getAllTipoAtivos(){
    const con = await conexao();
    try {
        const TipoAtivos = await con.execute('SELECT * FROM TIPO_ATIVO');
        return TipoAtivos
    } catch (error) {
        return error
    }
}
module.exports = {
    getAllTipoAtivos
}