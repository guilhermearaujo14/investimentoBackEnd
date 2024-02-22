const { json } = require('express');
const UpdateInvestimentoModel = require('../../model/Investimentos/UpdateInvestimentoModel');

async function UpdateInvestimentoController(req, res){
try {
    const {ID} = req.params;
    const { TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, DATA_COMPRA } = req.body;
    const retorno = await UpdateInvestimentoModel.UpdateInvestimentoModel(TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, DATA_COMPRA, ID);
    return await res.status(201).json({message:retorno})
} catch (error) {
    return res.status(400).json({Message: error})
}
}

module.exports = {
    UpdateInvestimentoController
}