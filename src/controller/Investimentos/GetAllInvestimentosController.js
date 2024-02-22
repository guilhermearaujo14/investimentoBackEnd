const { json } = require('express');
const getAllInvestimentos = require('../../model/Investimentos/GetAllInvestimentosModel')

async function GetAllInvestimentosController(req, res){
        try {
            const investimentos = await getAllInvestimentos.getAllInvestimentos();
            res.status(200).json(investimentos)
        } catch (error) {
            res.status(400).json("Error: "+error)
        }
        
}

module.exports = {
    GetAllInvestimentosController
}