const getAllTipoAtivosModel = require('../../model/TipoAtivo/getAllTipoAtivoModel');


async function getAllTipoAtivos(req, res){
    try {
        const [result] = await getAllTipoAtivosModel.getAllTipoAtivos();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error); 
    }
}

module.exports = {
    getAllTipoAtivos
}