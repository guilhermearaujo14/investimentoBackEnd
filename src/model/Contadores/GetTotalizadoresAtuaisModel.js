const conexao = require('../../../db/config');
const api = require('../../../server/apiAxios');

async function Totalizadores(USUARIO_ID){
    const con = await conexao.createConnection();
    const dado = [{TotalGeral: 0, TotalAcoes: 0, TotalFiis: 0, TotalETF: 0, TotalBDR: 0, PorcentagemAcoes: 0, PorcentagemFiis: 0, PorcentagemETF: 0, PorcentagemBDR:0}];
    const sql = `SELECT 0 TOTAL_GERAL, PAPEL, SUM(QUANTIDADE) QUANTIDADE, DESCRICAO, 0 TOTAL_ATUAL 
                FROM INVESTIMENTOS
                JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
                WHERE
                USUARIO_ID = ?
                AND TIPO_ATIVO_ID = 1
                GROUP BY PAPEL
                UNION ALL
                SELECT 0 TOTAL_GERAL, PAPEL, SUM(QUANTIDADE) QUANTIDADE, DESCRICAO, 0 TOTAL_ATUAL 
                FROM INVESTIMENTOS
                JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
                WHERE
                USUARIO_ID = ?
                AND TIPO_ATIVO_ID = 2
                GROUP BY PAPEL
                UNION ALL
                SELECT 0 TOTAL_GERAL, PAPEL, SUM(QUANTIDADE) QUANTIDADE, DESCRICAO, 0 TOTAL_ATUAL 
                FROM INVESTIMENTOS
                JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
                WHERE
                USUARIO_ID = ?
                AND TIPO_ATIVO_ID = 3
                GROUP BY PAPEL
                UNION ALL
                SELECT 0 TOTAL_GERAL, PAPEL, SUM(QUANTIDADE) QUANTIDADE, DESCRICAO, 0 TOTAL_ATUAL 
                FROM INVESTIMENTOS
                JOIN TIPO_ATIVO ON (INVESTIMENTOS.TIPO_ATIVO_ID = TIPO_ATIVO.ID)
                WHERE
                USUARIO_ID = ?
                AND TIPO_ATIVO_ID = 4
                GROUP BY PAPEL`;
    try {

        const [resp] = await con.execute(sql, [USUARIO_ID,USUARIO_ID,USUARIO_ID,USUARIO_ID]);
        
        const response = await GetValores(resp)
        return response
        
    } catch (error) {
        console.log(error)
        return {isSucesso: false, message: 'Ops... Ocorreu um erro ao exibir contadores...'}
    }finally{
        conexao.closeConnection(con);
    }

}


async function GetValores(listaAtivos){

    let data = []
    var total = 0
    data = await listaAtivos.map(async (item)=>{
        let valor = await api.lerDados(item.PAPEL)
        item.TOTAL_ATUAL = parseFloat(valor)*parseInt(item.QUANTIDADE)
        if(!item.TOTAL_ATUAL) item.TOTAL_ATUAL = 0  
        total = total + item.TOTAL_ATUAL
        item.TOTAL_GERAL = total
        return item;
    })
    
    return Promise.all(data)
}

module.exports={
    Totalizadores
}