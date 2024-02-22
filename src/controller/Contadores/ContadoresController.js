const ContadoresModel = require('../../model/Contadores/ContadoresModel');

async function Contadores(req, res){
    const { USUARIO_ID } = req.params;
    try {
        const contadores = await ContadoresModel.Contadores(USUARIO_ID);
        return await res.status(200).json(contadores[0]);
    } catch (error) {
        return await res.status(500).json(error.message);
    }
}

module.exports = {
    Contadores
}