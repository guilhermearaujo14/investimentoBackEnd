const conexao = require('../../../db/config')


async function getUsuarioByCPF(CPF){
    try {
        const con = await conexao.createConnection();
        const sql = 'SELECT * FROM USUARIO WHERE CPF = ?';
        const resultado = await con.execute(sql, [CPF])
        if(resultado[0].length === 0){
            return {isTemCadastrado: false}
        }else{
            return {isTemCadastrado: true}
        }
    } catch (error) {
        console.log(error)
    }finally{
        conexao.closeConnection(con);
    }
}



async function CreateUsuario(NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA){

    try {
        const con = await conexao();
        const DATA_INCLUSAO = new Date();
        console.log(NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, DATA_INCLUSAO)
        const sql = 'INSERT INTO USUARIO (NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, DATA_INCLUSAO) VALUES (?,?,?,?,?,?,?)';
        await con.execute(sql, [NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA, DATA_INCLUSAO]);
        return await {isSucesso: true, msg: 'Usuario criado com sucesso!'}
    } catch (error) {
        return {isSucesso: false, msg: 'Erro ao criar usuário :( =>'+error}
    }
}
module.exports = {
    CreateUsuario, 
    getUsuarioByCPF
}