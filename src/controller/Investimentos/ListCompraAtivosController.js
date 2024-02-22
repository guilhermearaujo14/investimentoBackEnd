const ListCompraAtivosModel = require('../../model/Investimentos/ListCompraAtivosModel');


async function ListCompraAtivos(req, res){
    const { USUARIO_ID} = req.params;
    const { PAPEL, TIPO_ATIVO_ID } = req.query;
    try {
        const [result] = await ListCompraAtivosModel.ListCompraAtivos(USUARIO_ID, PAPEL, TIPO_ATIVO_ID);
        return res.status(200).json(result);
    } catch (error) {

        return res.status(500).json(error);
    }
}

module.exports = {
    ListCompraAtivos
}