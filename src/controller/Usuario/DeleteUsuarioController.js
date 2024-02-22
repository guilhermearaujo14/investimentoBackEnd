const DeleteUsuarioModel = require('../../model/Usuario/DeleteUsuarioModel');

async function DeleteUsuario(req, res){
    try {
        const { ID } = req.params;
        const retorno = await DeleteUsuarioModel.DeleteUsuario(ID);
        return res.status(201).json(retorno)
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    DeleteUsuario
}