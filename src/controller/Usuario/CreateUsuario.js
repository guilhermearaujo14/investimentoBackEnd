const CreateUsuarioModel = require('../../model/Usuario/CreateUsuarioModel');
const brcrypt = require('bcryptjs');


async function CreateUsuario(req, res){
    try {
        const { NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, SENHA } = req.body;

        const isTemCadastrado = await CreateUsuarioModel.getUsuarioByCPF(CPF)
        
        if(isTemCadastrado.isTemCadastrado === true){
            return res.status(400).json("msg: Ops.. Usuario já cadastrado");
        }else{
                const hash = await brcrypt.hash(SENHA, 10);
                const resultado = await CreateUsuarioModel.CreateUsuario(NOME, CPF, DATA_NASCIMENTO, TELEFONE, EMAIL, hash);
                return res.status(201).json(resultado);
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    CreateUsuario
}