const GetUsuariosModel = require('../../model/Usuario/GetUsuariosModel');

async function GetAllusuarios(req, res){
    try {
        const usuario = await GetUsuariosModel.GetAllUsuarios()
        return res.status(200).json(usuario[0])
    } catch (error) {
        return res.status(400).json(error);
    }
}

async function GetUsuarioByCPF(req, res){
    try {
        const { CPF } = req.params;
        const usuario = await GetUsuariosModel.GetUsuarioByCPF(CPF)
        return res.status(200).json(usuario[0])
    } catch (error) {
        return res.status(400).json(error)
    }
}

async function GetUsuarioById(req, res){
    try {
        const { ID } = req.params;

        const usuario = await GetUsuariosModel.GetUsuarioById(ID);
        return res.status(200).json(usuario[0]);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    GetAllusuarios,
    GetUsuarioByCPF,
    GetUsuarioById
}