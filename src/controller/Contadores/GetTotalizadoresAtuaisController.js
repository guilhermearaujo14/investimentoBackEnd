const GetTotalizadoresAtuaisModel = require('../../model/Contadores/GetTotalizadoresAtuaisModel');

async function GetTotalizadoresAtuais(req, res){
    const {USUARIO_ID} = req.params;
    try {
        const response = await GetTotalizadoresAtuaisModel.Totalizadores(USUARIO_ID);
        return res.status(200).json(response)        
    } catch (error) {
        return res.status(400).json(error)
    }

}

module.exports = {
    GetTotalizadoresAtuais
}