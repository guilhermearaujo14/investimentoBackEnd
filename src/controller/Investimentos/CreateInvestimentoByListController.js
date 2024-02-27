const { json, response } = require('express');
const CreateInvestimentoByListModel = require('../../model/Investimentos/CreateInvestimentoByListModel');

async function CreateInvestimentoByList(req, res){
    const usuarioLogado = req.params;
    const dados = req.body;
    
    try {
        const response = await CreateInvestimentoByListModel.percorreLista(dados)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    CreateInvestimentoByList
}