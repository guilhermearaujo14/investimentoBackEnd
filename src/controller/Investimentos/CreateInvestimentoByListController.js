const { json, response } = require('express');
const CreateInvestimentoByListModel = require('../../model/Investimentos/CreateInvestimentoByListModel');

async function percorreLista(req, res){
    const dados = req.body;
    try {
        //console.log(dados)
        const data = JSON.parse(dados)
        console.log(data)
        data.map(dado =>{
            console.log(dado)
        })

        return res.status(200).json({message: `Lista carregada com sucesso!`})
    } catch (error) {
        console.log(error)
    }
    /*let count = 0;
    dados.forEach((element) => {
        console.log(element) 
        count +=1
        return       
    });*/
}

module.exports = {
    percorreLista
}