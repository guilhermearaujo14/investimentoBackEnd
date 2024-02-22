const { json } = require('express');
const conexao = require('../../../db/config')

class Usuario{
    //BUSCA TODOS OS USUARIOS
    static async getAllUsuarios(){
            try {
                let con = await conexao();
                const [usuario] = await con.execute(`SELECT * FROM USUARIO`);
                return usuario
            } catch (error) {
                console.log('Error: '+ error)
            }
    }
    //PESQUISA USUARIO POR CPF
    static async getUserByCPF(CPF){
            try {
                let con = await conexao();
                const usuario = await con.execute('SELECT * FROM USUARIO WHERE CPF = ?', [CPF]);
                return [usuario];
            } catch (error) {
                return error
            }
    }

    //CRIA USUARIO
    static async createUser(NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL){
            try {
                let con = await conexao();
                const values = [NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL];

                const usuario_cadastrado = await this.getUserByCPF(CPF)
                const result = JSON.stringify([usuario_cadastrado][0][0][0][0])

                if(result === '[]' || result === undefined){
                    const [result] = await con.execute('INSERT INTO USUARIO (NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL) VALUES (?,?,?,?,?)', values);
                    console.log(result)
                    return true;
                }else{
                    return false
                }
                
            } catch (error) {
                return "Error: não foi possível criar usuario - \n"+error
            }
    }

    //BUSCA USUARIO PELO ID
    static async getUserById(ID){
        try {
            let con = await conexao();
            const usuario = await con.execute('SELECT * FROM USUARIO WHERE ID = ?', [ID])
            return usuario;
        } catch (error) {
            return "ERROR: "+error;
        }
    }

    //ATUALIZA USUARIO
    static async UpdateUser(ID, NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL){
            try {
                let con = await conexao();

                const [result] = await con.execute('UPDATE USUARIO SET NOME = ?, CPF = ?, DATA_NASCIMENTO = ?, TELEFONE = ?, EMAIL = ? WHERE ID = ?', [NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, ID]);
                //console.log(result)
                return  [result]
            } catch (error) {
                return 'ERROR: Não foi possivel atualiar os dados desse usuário!'
            }
    }


    //DELETA USUARIO
    static async DeleteUser(ID){
            try {
                let con = await conexao();
                const values = ID;
                let [usuario] = await this.getUserById(values);
                if(usuario.length === 0 ){
                    return "Usuário não encontrado, não é possivel excluir o mesmo, verifique!";
                }else{
                    const [result] = await con.execute('DELETE FROM USUARIO WHERE ID = ?', [ID]);
                    return "Usuario deletado com sucesso!"
                }
            } catch (error) {
                return error
            }
    }

}




module.exports ={
    Usuario
}

