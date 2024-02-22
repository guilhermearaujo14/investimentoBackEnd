const GetInvestimentosByUsuarioModel = require('../../model/Investimentos/GetInvestimentosByUsuarioModel');


async function GetInvestimentoByUsuario(req, res){
    try {
        const { USUARIO_ID } = req.params;
        const investimentos = await GetInvestimentosByUsuarioModel.GetInvestimentosByUsuario(USUARIO_ID);
        return res.status(200).json(investimentos)
    } catch (error) {
        return res.status(400).json(error)
    }
}


module.exports = {
    GetInvestimentoByUsuario
}