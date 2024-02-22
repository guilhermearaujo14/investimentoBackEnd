const conexao = require('../../../db/config')

async function Contadores(USUARIO_ID){
    const con = await conexao();
    const ID = parseInt(USUARIO_ID);
    const sql = 
    `SELECT ROUND(SUM(TOTAL),2) AS TOTAL, ROUND(SUM(TOTAL_ACOES), 2) AS TOTAL_ACOES, ROUND(SUM(TOTAL_FIIS), 2) AS TOTAL_FIIS, ROUND(SUM(TOTAL_ETFS),2) AS TOTAL_ETFS, ROUND(SUM(TOTAL_BDRS),2) AS TOTAL_BDRS, 
    ROUND(SUM(TOTAL_ACOES)/SUM(TOTAL)*100, 2) AS PORCENTAGEM_ACOES, 
    ROUND(SUM(TOTAL_FIIS)/SUM(TOTAL)*100 , 2)AS PORCENTAGEM_FIIS,
    ROUND(SUM(TOTAL_ETFS)/SUM(TOTAL)*100 , 2)AS PORCENTAGEM_ETFS, 
    ROUND(SUM(TOTAL_BDRS)/SUM(TOTAL)*100 , 2)AS PORCENTAGEM_BDRS
    FROM(
    SELECT SUM(TOTAL_INVESTIDO) AS TOTAL, 0 AS TOTAL_ACOES, 0 AS TOTAL_FIIS, 0 AS TOTAL_ETFS, 0 AS TOTAL_BDRS FROM INVESTIMENTOS
    WHERE USUARIO_ID = ? 
    UNION
    SELECT 0 TOTAL, SUM(TOTAL_INVESTIDO) AS TOTAL_ACOES, 0 AS TOTAL_FIIS, 0 AS TOTAL_ETFS, 0 AS TOTAL_BDRS FROM INVESTIMENTOS
    WHERE TIPO_ATIVO_ID = 1 AND USUARIO_ID = ?
    UNION
    SELECT 0 AS TOTAL, 0 AS TOTAL_ACOES, SUM(TOTAL_INVESTIDO) AS TOTAL_FIIS, 0 AS TOTAL_ETFS, 0 AS TOTAL_BDRS FROM INVESTIMENTOS
    WHERE TIPO_ATIVO_ID = 2 AND USUARIO_ID = ?
    UNION
    SELECT 0 AS TOTAL, 0 AS TOTAL_ACOES, 0 AS TOTAL_FIIS, SUM(TOTAL_INVESTIDO) AS TOTAL_ETFS, 0 AS TOTAL_BDRS FROM INVESTIMENTOS
    WHERE TIPO_ATIVO_ID = 3 AND USUARIO_ID = ?
    UNION
    SELECT 0 AS TOTAL, 0 AS TOTAL_ACOES, 0 AS TOTAL_FIIS, 0 AS TOTAL_ETFS, SUM(TOTAL_INVESTIDO) AS TOTAL_BDRS FROM INVESTIMENTOS
    WHERE TIPO_ATIVO_ID = 4 AND USUARIO_ID = ?
    ) AS T1 `

    try {
        const contadores = await con.execute(sql, [ID, ID, ID, ID, ID ]);
        return await contadores
    } catch (error) {
        return {message: 'Ops... Não foi possível recuperar os dados. :(', error}        
    }

}
module.exports = {
    Contadores
}
