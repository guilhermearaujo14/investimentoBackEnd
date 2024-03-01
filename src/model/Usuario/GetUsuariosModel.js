const conexao = require('../../../db/config')

async function GetAllUsuarios(){
    const con = await conexao.createConnection();
    try {
        const sql = 'SELECT * FROM USUARIO'
        const usuario = await con.execute(sql)
        return usuario;
    } catch (error) {
        return 'Ops.. não foi possível retornar dados dos usuários :( =>'+error
    }finally{
        conexao.closeConnection(con);
    }
}


async function GetUsuarioByCPF(CPF){
    const con = await conexao.createConnection();
    try {

        const sql = 'SELECT * FROM USUARIO WHERE CPF = ?';
        const usuario = await con.execute(sql, [CPF])
        return usuario;
    } catch (error) {
        return 'Ops.. não foi possível retornar dados do usuário :( =>'+error
    }finally{
        conexao.closeConnection(con);
    }
}


async function GetUsuarioById(ID){
    const con = await conexao.createConnection();
    try {

        const sql = 'SELECT * FROM USUARIO WHERE ID = ?';
        const [usuario] = await con.execute(sql, [ID]);
        console.log([usuario][0])
        if(!usuario[0] || usuario[0] == ''){
            return [msg= 'Ops... Usuário não encontrado!']
        }else{
            return usuario;
        }
    } catch (error) {
        return 'Ops.. Não foi possível retornar os dados do usuário solicitado :( => '+error;
    }finally{
        conexao.closeConnection(con);
    }
}

module.exports = {
    GetAllUsuarios, 
    GetUsuarioByCPF,
    GetUsuarioById
}