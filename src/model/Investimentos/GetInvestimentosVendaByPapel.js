const conexao = require('../../../db/config')
const buscaDadosPapel = require('../../../server/apiAxios');

async function GetInvestimentosVendaByPapel(USUARIO_ID, PAPEL){
    const con = await conexao();
    let data = [];
try {
    const sql = 
                `
                    SELECT PAPEL, SUM(QUANTIDADE_COMPRA) - SUM(QUANTIDADE_VENDA) AS QUANTIDADE, SUM(TOTAL_INVESTIDO_COMPRA) - SUM(TOTAL_INVESTIDO_VENDA) AS TOTAL_INVESTIDO, 
                    ROUND((SUM(TOTAL_INVESTIDO_COMPRA) - SUM(TOTAL_INVESTIDO_VENDA))/(SUM(QUANTIDADE_COMPRA) - SUM(QUANTIDADE_VENDA)),2) AS PRECO_MEDIO, VALOR_ATUAL, TOTAL_INVESTIDO_ATUAL, LUCRO_PERDA, DESCRICAO, SETOR
                    FROM (
                    SELECT INVESTIMENTOS.PAPEL, ROUND(SUM(INVESTIMENTOS.QUANTIDADE), 2) AS QUANTIDADE_COMPRA, 0 AS QUANTIDADE_VENDA, ROUND(SUM(INVESTIMENTOS.TOTAL_INVESTIDO), 2) AS TOTAL_INVESTIDO_COMPRA, 
                    0 AS TOTAL_INVESTIDO_VENDA,0 AS PRECO_MEDIO, 0 AS VALOR_ATUAL,  0 AS TOTAL_INVESTIDO_ATUAL, 0 AS LUCRO_PERDA, TIPO_ATIVO.DESCRICAO AS DESCRICAO, INVESTIMENTOS.SETOR AS SETOR
                    FROM INVESTIMENTOS 
                    JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
                    WHERE 
                        USUARIO_ID = ? 
                    AND ISCOMPRA = 1
                    GROUP BY PAPEL, PRECO_MEDIO, VALOR_ATUAL, TOTAL_INVESTIDO_ATUAL
                    UNION ALL
                    SELECT INVESTIMENTOS.PAPEL, 0 AS QUANTIDADE_COMPRA, ROUND(SUM(INVESTIMENTOS.QUANTIDADE), 2) AS QUANTIDADE_VENDA,0 AS TOTAL_INVESTIDO_COMPRA, ROUND(SUM(INVESTIMENTOS.TOTAL_INVESTIDO), 2) AS TOTAL_INVESTIDO_VENDA,
                    0 AS PRECO_MEDIO, 0 AS VALOR_ATUAL,  0 AS TOTAL_INVESTIDO_ATUAL, 0 AS LUCRO_PERDA, TIPO_ATIVO.DESCRICAO AS DESCRICAO, INVESTIMENTOS.SETOR AS SETOR
                    FROM INVESTIMENTOS 
                    JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
                    WHERE 
                        USUARIO_ID = ? 
                    AND ISVENDA = 1
                    GROUP BY PAPEL, PRECO_MEDIO, VALOR_ATUAL, TOTAL_INVESTIDO_ATUAL
                    )T1 
                    WHERE T1.PAPEL = ?
                    GROUP BY PAPEL            
                `
                const result = await con.execute(sql, [USUARIO_ID, USUARIO_ID, PAPEL]);

                let data = result[0].map(async (resultado)=>{
                    let valorAtual = await buscaDadosPapel.lerDados(resultado.PAPEL)
                    console.log(resultado.PAPEL)

                    if(valorAtual === undefined) valorAtual = 0

                    resultado.VALOR_ATUAL = parseFloat(valorAtual)
                    resultado.TOTAL_INVESTIDO_ATUAL = parseInt(resultado.QUANTIDADE)*valorAtual
                    resultado.LUCRO_PERDA = resultado.TOTAL_INVESTIDO_ATUAL-resultado.TOTAL_INVESTIDO
                    return resultado
                })
                
                return Promise.all(data);
    
} catch (error) {
    console.log(error)
    return {message: error}
}
}
module.exports = {
    GetInvestimentosVendaByPapel
}