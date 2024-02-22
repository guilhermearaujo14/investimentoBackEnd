const conexao = require('../../../db/config')
const buscaDadosPapel = require('../../../server/apiAxios');



async function GetInvestimentosByUsuario(USUARIO_ID){
    let data = []
    try {
        const con = await conexao();
        const sql = 
        `
        SELECT PAPEL, SUM(QUANTIDADE_COMPRA) - SUM(QUANTIDADE_VENDA) AS QUANTIDADE, SUM(TOTAL_INVESTIDO_COMPRA) - SUM(TOTAL_INVESTIDO_VENDA) AS  TOTAL_INVESTIDO, 
        PRECO_MEDIO, VALOR_ATUAL, TOTAL_INVESTIDO_ATUAL, LUCRO_PERDA, DESCRICAO FROM (
        SELECT INVESTIMENTOS.PAPEL, ROUND(SUM(INVESTIMENTOS.QUANTIDADE), 2) AS QUANTIDADE_COMPRA, 0 AS QUANTIDADE_VENDA, ROUND(SUM(INVESTIMENTOS.TOTAL_INVESTIDO), 2) AS TOTAL_INVESTIDO_COMPRA, 
        0 AS TOTAL_INVESTIDO_VENDA,0 AS PRECO_MEDIO, 0 AS VALOR_ATUAL,  0 AS TOTAL_INVESTIDO_ATUAL, 0 AS LUCRO_PERDA, TIPO_ATIVO.DESCRICAO AS DESCRICAO
        FROM INVESTIMENTOS 
        JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
        WHERE 
            USUARIO_ID = ? 
        AND ISCOMPRA = 1
        GROUP BY PAPEL, PRECO_MEDIO, VALOR_ATUAL, TOTAL_INVESTIDO_ATUAL
        UNION ALL
        SELECT INVESTIMENTOS.PAPEL, 0 AS QUANTIDADE_COMPRA, ROUND(SUM(INVESTIMENTOS.QUANTIDADE), 2) AS QUANTIDADE_VENDA,0 AS TOTAL_INVESTIDO_COMPRA, ROUND(SUM(INVESTIMENTOS.TOTAL_INVESTIDO), 2) AS TOTAL_INVESTIDO_VENDA,
        0 AS PRECO_MEDIO, 0 AS VALOR_ATUAL,  0 AS TOTAL_INVESTIDO_ATUAL, 0 AS LUCRO_PERDA, TIPO_ATIVO.DESCRICAO AS DESCRICAO
        FROM INVESTIMENTOS 
        JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
        WHERE 
            USUARIO_ID = ? 
        AND ISVENDA = 1
        GROUP BY PAPEL, PRECO_MEDIO, VALOR_ATUAL, TOTAL_INVESTIDO_ATUAL
        )T1 GROUP BY PAPEL
        HAVING QUANTIDADE > 0
        `

        

        const result = await con.execute(sql, [USUARIO_ID, USUARIO_ID]);
        const investimentos = result[0];
        data = await investimentos.map( async (obj) =>{
            let valorAtual = await buscaDadosPapel.lerDados(obj.PAPEL)

                if(valorAtual === undefined) valorAtual = 0  
            
            let precoMedio = await obj.TOTAL_INVESTIDO / obj.QUANTIDADE
            obj.PRECO_MEDIO = precoMedio.toFixed(2)
            obj.VALOR_ATUAL = valorAtual;
            obj.TOTAL_INVESTIDO_ATUAL = obj.VALOR_ATUAL * obj.QUANTIDADE  
            obj.LUCRO_PERDA = obj.TOTAL_INVESTIDO_ATUAL - obj.TOTAL_INVESTIDO
            
            return obj;             
        });
        
        return Promise.all(data);
    } catch (error) {
        return "Ops... Não foi possivel realizar pesquisa :( => "+error
    }
}





module.exports = {
    GetInvestimentosByUsuario
}