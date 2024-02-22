const conexao = require('../../../db/config');



async function Login(CPF){
    const con = await conexao();
    const sql = 'SELECT ID, NOME, CPF, SENHA FROM USUARIO WHERE CPF = ?'

    try {        
        const [usuario] = await con.execute(sql, [CPF])

        if(!usuario){
            return {isSucesso: false, Message: 'Ops.. Usuário não encontrado, verifique!'}
        }else{    
            return {isSucesso: true, usuario}
        }
        }catch (error) {
        return {isSucesso: false, Message: 'Ops.. Não foi possivel realizar o login :(', error}        
    }
    
}

module.exports = {
    Login
}