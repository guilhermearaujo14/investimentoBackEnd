const { json } = require('express');
const conexao = require('../../../db/config')


async function CreateInvestimento(USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, DATA_COMPRA, isCOMPRA, isVENDA){
    try {
        const con = await conexao.createConnection();
        const DATA_INCLUSAO = new Date();
        const TOTAL_INVESTIDO  = QUANTIDADE*VALOR;
        PAPEL = PAPEL.toUpperCase()
        const sql = 'INSERT INTO INVESTIMENTOS (USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, TOTAL_INVESTIDO,  DATA_COMPRA, DATA_INCLUSAO, isCOMPRA, isVENDA) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        await con.execute(sql, [USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR,TOTAL_INVESTIDO,  DATA_COMPRA, DATA_INCLUSAO, isCOMPRA, isVENDA])
        return await {isSucesso: true, message: "Investimento inserido com sucesso!"}
    } catch (error) {
        console.log(error)
        return "Ops... Erro ao inserir ativo!"
    }finally{
        conexao.closeConnection(con);
    }
    
}

module.exports = {
    CreateInvestimento
}