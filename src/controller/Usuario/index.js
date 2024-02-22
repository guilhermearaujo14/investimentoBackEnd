const UsuarioModel = require('../../model/Usuario/index');

class Usuario{

    static async getAllUsers(req, res){
        try {
            const usuarios = await UsuarioModel.Usuario.getAllUsuarios();
            res.send(usuarios)
        } catch (error) {
            res.send("Error: "+error)
        }
    }

    static async getUserByCPF(req, res){
        try {
            const { CPF } = req.params;
            console.log(CPF)
            const [usuario] = await UsuarioModel.Usuario.getUserByCPF(CPF)
            console.log(usuario[0])
            if(usuario[0].length !== 0){
               return res.status(200).json(usuario[0]);
            }else{
                return true;
            }

        } catch (error) {
            console.log(error)
        }
    }



    static async createUser(req, res){
        try {
            const {NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL} = req.body;
            const isSucesso = await UsuarioModel.Usuario.createUser(NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL);
            if(isSucesso){
                console.log(isSucesso)
                await res.send(`Usuário ${NOME} criado com sucesso!`);
            }else{
                await res.send(`Já existe o CPF ${CPF} cadastrado em nossa base!`);
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async UpdateUser(req, res){
        try {
            const {ID} = req.params;
            const {NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL} = req.body;
            const isSucesso = await UsuarioModel.Usuario.UpdateUser(ID, NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL);
            return await res.send(isSucesso)
        } catch (error) {
           return res.send('Error: '+error)
        }
    }

    static async DeleteUser(req, res){
        try {
            const { ID } = req.params;
            const MSG_Retorno = await UsuarioModel.Usuario.DeleteUser(ID);
            return await res.status(400).json(MSG_Retorno);
        } catch (error) {
            return res.send('ERROR: '+error);
        }
    }

}

module.exports=Usuario