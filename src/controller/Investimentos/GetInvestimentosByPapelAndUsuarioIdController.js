const GetInvestimentosByPapelAndUsuarioIdModel = require('../../model/Investimentos/GetInvestimentosByPapelAndUsuarioIdModel');

async function GetInvestimentosByPapelAndUsuarioId(req, res){
    const { USUARIO_ID, PAPEL } = req.params;
try {
    const response = await GetInvestimentosByPapelAndUsuarioIdModel.GetInvestimentosByPapelAndUsuarioId(USUARIO_ID, PAPEL)
    return res.status(200).json(response);
} catch (error) {
    return res.status(500).json(error)
}

}

module.exports = {
    GetInvestimentosByPapelAndUsuarioId
}