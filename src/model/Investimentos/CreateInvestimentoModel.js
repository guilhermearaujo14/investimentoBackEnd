const { json } = require('express');
const ApiGoogleSheets = require('../../../server/ApiGoogleSheets');
const conexao = require('../../../db/config')

async function CreateInvestimento(USUARIO_ID, PAPEL, SETOR, QUANTIDADE, VALOR, DATA_COMPRA, isCOMPRA, isVENDA){
    const con = await conexao.createConnection();
    try {

        const listaAtivos = await ApiGoogleSheets.LerGoogleSheets()
        const dadosPesquisa = GetDadosAtivo(listaAtivos, PAPEL)
        if(dadosPesquisa.length === 0){
            return {isSucesso: false, message: 'Ops... Ativo não encontrado, verifique se o ticket está correto!'}
        }else{

            const DATA_INCLUSAO = new Date();
            const TOTAL_INVESTIDO  = QUANTIDADE*VALOR;
            const sql = 'INSERT INTO INVESTIMENTOS (USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, TOTAL_INVESTIDO,  DATA_COMPRA, DATA_INCLUSAO, isCOMPRA, isVENDA) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
            const investimento = await con.execute(sql, [USUARIO_ID, dadosPesquisa[0].tipo, dadosPesquisa[0].papel, dadosPesquisa[0].nome, SETOR, QUANTIDADE, VALOR,TOTAL_INVESTIDO,  DATA_COMPRA, DATA_INCLUSAO, isCOMPRA, isVENDA])
            return {isSucesso: true, message: "Investimento inserido com sucesso!", investimento}
        }
    } catch (error) {
        console.log(error)
        return {isSucesso: false, message: "Ops... Erro ao inserir ativo!"}
    }finally{
        conexao.closeConnection(con);
    }
    
}

function GetDadosAtivo(lista, PAPEL){
    PAPEL = PAPEL.toUpperCase()
    const investimentoFiltered = lista.filter((item)=> item.papel == PAPEL)
    return investimentoFiltered
}

module.exports = {
    CreateInvestimento
}