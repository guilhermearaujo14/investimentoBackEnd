const conexao = require('../../../db/config');

async function ListCompraAtivos(USUARIO_ID, PAPEL, TIPO_ATIVO_ID){
    const con = await conexao.createConnection();
    const sql = 
    `SELECT INVESTIMENTOS.ID, INVESTIMENTOS.PAPEL, INVESTIMENTOS.QUANTIDADE, INVESTIMENTOS.VALOR, INVESTIMENTOS.TOTAL_INVESTIDO,
    INVESTIMENTOS.DATA_COMPRA, TIPO_ATIVO.DESCRICAO, INVESTIMENTOS.isCOMPRA, INVESTIMENTOS.isVENDA
    FROM INVESTIMENTOS
    JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
    WHERE 
        INVESTIMENTOS.USUARIO_ID = ?
    AND INVESTIMENTOS.PAPEL LIKE CONCAT('%', ? ,'%')
    AND ((INVESTIMENTOS.TIPO_ATIVO_ID = ?) OR (? IS NULL) OR (? = ''))
    ORDER BY INVESTIMENTOS.DATA_COMPRA DESC`
    try {
        const result = await con.execute(sql, [USUARIO_ID, PAPEL, TIPO_ATIVO_ID, TIPO_ATIVO_ID, TIPO_ATIVO_ID]);
        return result;
    } catch (error) {
        console.log(error)
        return 'Ops.. Não foi possível retornar resultados. :( ', error
    }finally{
        conexao.closeConnection(con);
    }
}

module.exports = {
    ListCompraAtivos
}