const conexao = require('../../../db/config')
const { Investimento } = require('./Investimento')

async function percorreLista(dados, usuarioLogado){
    const data = Object.values(dados);
    let result = {};
    try {

        //data[0].map(async (item, index)=>{
            for (const item of data[0]) {

                let quantidade = parseFloat(item.quantidade);
                let precoFormat = item.preco.replace(',', '.')
                let preco = parseFloat(precoFormat);
                let total = quantidade * preco;
                let data = formataData(item.data)
                let investimento = await Investimento.criaInvestimento(usuarioLogado.USUARIO_ID, parseFloat(item.tipo), item.papel, '', '', quantidade, preco, total, data, new Date(), 1, 0);
                //console.log(investimento)
                try {
                    result = await CreateInvestimentoByList(investimento);   
                    //console.log(result.message)
                } catch (error) {
                    result = error;
                }

            }   
    return result
    } catch (error) {
        console.log(error)
     return {result}   
    }
}

async function CreateInvestimentoByList(investimento = new Investimento()){
    const con = await conexao.createConnection();
    const sql = 
    `INSERT INTO INVESTIMENTOS (USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, TOTAL_INVESTIDO, DATA_COMPRA, DATA_INCLUSAO, isCOMPRA, isVENDA) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    try {
        const response = await con.execute(sql, [investimento.USUARIO_ID, investimento.TIPO_ATIVO_ID, investimento.PAPEL, investimento.NOME_EMPRESA, investimento.SETOR, investimento.QUANTIDADE, investimento.VALOR, investimento.TOTAL_INVESTIDO, investimento.DATA_COMPRA, investimento.DATA_INCLUSAO, investimento.isCOMPRA, investimento.isVENDA]);
        //console.log(response);
        return {isSuceso: true, message: "Lista inserida com sucesso!", response}
    } catch (error) {
        console.log(error)
        throw new Error("Ops... Não foi possível inserir registros"+ error.message)
    }finally{
        conexao.closeConnection(con);
    }
}


function formataData(data){
    const [dia, mes, ano] = data.split('/');
    const dataFormatada = `${ano}-${mes}-${dia}`
    return dataFormatada
}


function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve, ms))
}
module.exports = {
    percorreLista
}