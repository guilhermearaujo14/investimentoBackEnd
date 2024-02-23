const { json } = require('express');
const conexao = require('../../../db/config');
const createInvestimentoModel = require('../../model/Investimentos/CreateInvestimentoModel');

async function CreateInvestimentoController(req, res){
    try {
        const { USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, DATA_COMPRA, isCOMPRA, isVENDA } = req.body;
        const retorno = await createInvestimentoModel.CreateInvestimento( USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, DATA_COMPRA, isCOMPRA, isVENDA)
        return await res.status(201).json(retorno)
    } catch (error) {
        return await res.status(400).json("message:"+error)

    }

    
}

module.exports = {
    CreateInvestimentoController
}