const conexao = require('../../../db/config');


async function Login(CPF){
    console.log(CPF)
    const con = await conexao.createConnection();
    console.log('cheguei aqui')
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
    }finally{
        //conexao.closeConnection(con);
    }
    
}

module.exports = {
    Login
}