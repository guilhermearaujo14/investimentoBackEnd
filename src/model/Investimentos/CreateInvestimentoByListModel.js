const conexao = require('../../../db/config')
const { Investimento } = require('./Investimento')

async function percorreLista(dados, usuarioLogado){
    const data = Object.values(dados)
    const result = []
    try {
        data[0].map(async (item, index)=>{
            let quantidade = parseFloat(item.quantidade);
            let preco = parseFloat(item.preco);
            let total = quantidade * preco;
            let data = formataData(item.data)
            let investimento = Investimento.criaInvestimento(usuarioLogado, parseFloat(item.tipo), item.papel, '', '', quantidade, preco, total, data, new Date(), 1, 0);
            console.log(investimento)
            result = await CreateInvestimentoByList(investimento);
        })
        return {result}
    
    } catch (error) {
     return { message: error}   
    }
}

async function CreateInvestimentoByList(investimento = new Investimento()){
    const con = await conexao();
    const sql = 
    `INSERT INTO INVESTIMENTOS (USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, TOTAL_INVESTIDO, DATA_COMPRA, DATA_INCLUSAO, isCOMPRA, isVENDA) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    try {
        const response = await con.execute(sql, [investimento.USUARIO_ID, investimento.TIPO_ATIVO_ID, investimento.PAPEL, investimento.NOME_EMPRESA, investimento.SETOR, investimento.QUANTIDADE, investimento.VALOR, investimento.TOTAL_INVESTIDO, investimento.DATA_COMPRA, investimento.DATA_INCLUSAO, investimento.isCOMPRA, investimento.isVENDA]);
        console.log(response);
        return {isSuceso: true, message: "Ativo inserido com sucesso!", response}
    } catch (error) {
        console.log(error)
    }
}


function formataData(data){
    const [dia, mes, ano] = data.split('/')
    const dataFormatada = `${ano}-${mes}-${dia}`
    return dataFormatada
}

module.exports = {
    percorreLista
}