const GetInvestimentoByIDModel = require('../../model/Investimentos/GetInvestimentoByIdModel');


async function GetInvestimentoById(req, res){
    const { ID } = req.params;
    try {
        const result = await GetInvestimentoByIDModel.GetInvestimentoById(ID);
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {
    GetInvestimentoById
}