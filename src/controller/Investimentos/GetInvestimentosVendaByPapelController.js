const GetInvestimentosVendaByPapelModel = require('../../model/Investimentos/GetInvestimentosVendaByPapel')
async function GetInvestimentosVendaByPapelController(req, res){
try {
    const {USUARIO_ID } = req.params;
    const { PAPEL } = req.query;
    //console.log(`Usuario ${USUARIO_ID} - Papel ${PAPEL}`);
    const result = await GetInvestimentosVendaByPapelModel.GetInvestimentosVendaByPapel(USUARIO_ID, PAPEL)
    return res.status(200).json(result);
} catch (error) {
    return res.status(400).json(error);
}
}
module.exports = {
    GetInvestimentosVendaByPapelController
}