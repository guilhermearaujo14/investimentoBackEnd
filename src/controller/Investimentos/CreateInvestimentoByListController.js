const { json, response } = require('express');
const CreateInvestimentoByListModel = require('../../model/Investimentos/CreateInvestimentoByListModel');

async function percorreLista(req, res){
    const dados = req.body;
    let count = 0;
    dados.forEach((element) => {
        console.log(element) 
        count +=1
        return       
    });
return res.status(200).json({message: `Lista percorrida ${count} vezes com sucesso!`})
}

async function CreateInvestimentoByList(req, res){
    const dados = req.body;
    console.log(dados)
    try {
        const response = await CreateInvestimentoByListModel.percorreLista(dados)
        return res.status(201).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}

module.exports = {
    percorreLista
}