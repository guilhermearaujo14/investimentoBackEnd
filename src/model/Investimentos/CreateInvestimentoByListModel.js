const conexao = require('../../../db/config')
const Investimento = require('./Investimento')

async function percorreLista(dados){
    let count = 0;
    dados.forEach((element) => {
        console.log(element) 
        count +=1
        return       
    });
return {message: `Lista percorrida ${count} vezes com sucesso!`}
}

async function CreateInvestimentoByList(investimento = new Investimento()){
    const con = await conexao();
    const sql = 
    `INSERT INTO INVESTIMENTOS VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    try {
        //const response = await con.execute(sql, [investimento])
        console.log(investimento)
        return
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    percorreLista
}