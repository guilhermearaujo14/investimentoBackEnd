const conexao = require('../../../db/config');

async function DeleteUsuario(ID){
    try {
        const con = await conexao.createConnection();
        const sql = 'DELETE FROM USUARIO WHERE ID = ?';
        await con.execute(sql, [ID])
        return {isUsuarioDeletado: true, msg: 'Usuário excluído com sucesso!'}        
    } catch (error) {
        return {isUsuarioDeletado: false, msg: 'Ops... Não foi possível excluir usuario :( = >' + error}
    }finally{
        conexao.closeConnection(con);
    }
}

module.exports = {
    DeleteUsuario
}