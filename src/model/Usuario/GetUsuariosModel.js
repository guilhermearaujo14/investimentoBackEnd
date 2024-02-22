const conexao = require('../../../db/config')

async function GetAllUsuarios(){
    try {
        const con = await conexao();
        const sql = 'SELECT * FROM USUARIO'
        const usuario = await con.execute(sql)
        return usuario;
    } catch (error) {
        return 'Ops.. não foi possível retornar dados dos usuários :( =>'+error
    }
}


async function GetUsuarioByCPF(CPF){
    try {
        const con = await conexao();

        const sql = 'SELECT * FROM USUARIO WHERE CPF = ?';
        const usuario = await con.execute(sql, [CPF])
        return usuario;
    } catch (error) {
        return 'Ops.. não foi possível retornar dados do usuário :( =>'+error
    }
}


async function GetUsuarioById(ID){
    try {
        const con = await conexao();

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
    }
}

module.exports = {
    GetAllUsuarios, 
    GetUsuarioByCPF,
    GetUsuarioById
}