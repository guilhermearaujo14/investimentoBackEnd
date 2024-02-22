const conexao = require('../../../db/config')
const Investimento = require('./Investimento')

async function RegistrarVenda(USUARIO_ID, PAPEL, QUANTIDADE, VALOR, DATA_COMPRA){
    const con = await conexao();
    const sql = `
    SELECT USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA,SETOR, SUM(QUANTIDADE_COMPRA) - SUM(QUANTIDADE_VENDA) AS QUANTIDADE_DISPONIVEL
    FROM (
    SELECT USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA,SETOR, 0 AS QUANTIDADE_VENDA, SUM(QUANTIDADE) AS QUANTIDADE_COMPRA 
    FROM INVESTIMENTOS 
    WHERE 
        USUARIO_ID = ? 
    AND PAPEL = ?
    AND isVENDA = 0
    AND ISCOMPRA = 1
    UNION ALL
    SELECT USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA,SETOR, SUM(QUANTIDADE) AS QUANTIDADE_VENDA, 0 AS QUANTIDADE_COMPRA
    FROM INVESTIMENTOS 
    WHERE 
        USUARIO_ID = ? 
    AND PAPEL = ?
    AND isVENDA = 1
    AND ISCOMPRA = 0) AS T1
    GROUP BY PAPEL
    `;
    try {
        const result = await con.execute(sql, [USUARIO_ID, PAPEL,USUARIO_ID, PAPEL]);
        const dados = result[0]
        const VendaRegistrada = dados.map( async (dado) =>{
            let isVerificado = await VerificaQuantidadePermitidaVenda(dado.USUARIO_ID, QUANTIDADE, dado.QUANTIDADE_DISPONIVEL, dado.TIPO_ATIVO_ID, PAPEL, dado.NOME_EMPRESA, dado.SETOR, VALOR, DATA_COMPRA)
            return isVerificado
        })  
        return Promise.all(VendaRegistrada);
    } catch (error) {
        return error
    }
}

async function VerificaQuantidadePermitidaVenda(USUARIO_ID, QUANTIDADE, QUANTIDADE_DISPONIVEL, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, VALOR, DATA_COMPRA){
    if(parseInt(QUANTIDADE) <= parseInt(QUANTIDADE_DISPONIVEL)){
        let total_investido = QUANTIDADE*VALOR
        const resultado =  await CreateVenda(USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, total_investido, DATA_COMPRA)
        return resultado
    }else{
        return [{isSucesso: false, msg: 'Ops.. Não foi possível registrar venda, verifique a quantidade informada!'}]
    }
}

async function CreateVenda(USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, TOTAL_INVESTIDO, DATA_COMPRA){
    const con = await conexao();
    const DATA_INCLUSAO = new Date();
    const sql = `INSERT INTO INVESTIMENTOS (USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, TOTAL_INVESTIDO, DATA_COMPRA, DATA_INCLUSAO, isCOMPRA, isVENDA) 
                 VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
    try {                 
        const result = await con.execute(sql, [USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, TOTAL_INVESTIDO, DATA_COMPRA, DATA_INCLUSAO, 0, 1])
        return [{isSucesso: true, msg: 'Venda registrada com sucesso!', data: result[0]}]
    } catch (error) {
        return [{isSucesso: false, msg: error}]
    }
}

module.exports = {
    RegistrarVenda
}