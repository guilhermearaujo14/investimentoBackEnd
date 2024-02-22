const conexao = require('../../../db/config');
const Investimento = require('./Investimento');


async function GetInvestimentoById(ID){
    const con = await conexao();
    let investimento = new Investimento();
    const sql = `SELECT * FROM INVESTIMENTOS WHERE ID = ?`
    try {
        const result = await con.execute(sql, [ID])
        investimento = result[0]
        console.log(investimento);
        return investimento
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    GetInvestimentoById
}