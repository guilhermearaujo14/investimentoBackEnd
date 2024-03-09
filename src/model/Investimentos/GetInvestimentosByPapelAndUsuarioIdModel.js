const conexao = require('../../../db/config');

async function GetInvestimentosByPapelAndUsuarioId(USUARIO_ID, PAPEL){
    const con = await conexao.createConnection();
    const sql = `
                SELECT INVESTIMENTOS.DATA_COMPRA, INVESTIMENTOS.QUANTIDADE, INVESTIMENTOS.VALOR, INVESTIMENTOS.TOTAL_INVESTIDO,
                CASE WHEN INVESTIMENTOS.ISCOMPRA = 1 THEN 'Compra' ELSE 'Venda' END TIPO_MOVIMENTACAO
                FROM INVESTIMENTOS 
                WHERE 
                    INVESTIMENTOS.USUARIO_ID = ?
                AND INVESTIMENTOS.PAPEL = ? 
                ORDER BY INVESTIMENTOS.DATA_COMPRA DESC`;
    try {
        const [response] = await con.execute(sql, [USUARIO_ID, PAPEL]);
        if(response == ''){
            return {isSucesso: false, message: "Ops.. Não existem registros para exibição!"};
        }
        return response;
        
    } catch (error) {
        return {isSucesso: false, message: "Ops... Não foi possível obter os dados!"+error}
    }finally{
        conexao.closeConnection(con)
    }


}


module.exports = {
    GetInvestimentosByPapelAndUsuarioId
}