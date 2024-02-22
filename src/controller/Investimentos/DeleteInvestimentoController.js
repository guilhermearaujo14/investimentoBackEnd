const { json } = require('express');
const DeleteInvestimentoModel = require('../../model/Investimentos/DeleteInvestimentoModel')


async function DeleteInvestimentoController(req, res){
    try {
        const {ID} = req.params;
        const retorno = await DeleteInvestimentoModel.DeleteInvestimentoModel(ID)
        return await res.status(201).json(retorno) 
    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    DeleteInvestimentoController
}