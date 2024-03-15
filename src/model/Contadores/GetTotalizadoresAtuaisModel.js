const conexao = require('../../../db/config');
const api = require('../../../server/apiAxios');
const ApiGoogle = require('../../../server/ApiGoogleSheets');
async function Totalizadores(USUARIO_ID){
    const con = await conexao.createConnection();
    let dados = [];
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
        
        const ListAcoes = await MontaListaFiltrada(response, "Ação")
        const totalAcoes = await somaValores(ListAcoes)
        const ListFiis = await MontaListaFiltrada(response, "Fundo Imobiliario")
        const totalFIIs = await somaValores(ListFiis)
        const ListETF = await MontaListaFiltrada(response, "ETF")
        const totalETF = await somaValores(ListETF)
        const ListBDR = await MontaListaFiltrada(response, "BDR")
        const totalBDR = await somaValores(ListBDR)
        const totalGeral = await somaValores(response)
        
        dados = [{TotalGeral: totalGeral,
                 TotalAcoes: totalAcoes,
                 TotalFiis: totalFIIs,
                 TotalETF: totalETF,
                 TotalBDR: totalBDR,
                 PorcentagemAcoes: ((totalAcoes/totalGeral)*100).toFixed(2),
                 PorcentagemFiis: ((totalFIIs/totalGeral)*100).toFixed(2),
                 PorcentagemETF: ((totalETF/totalGeral)*100).toFixed(2),
                 PorcentagemBDR: ((totalBDR/totalGeral)*100).toFixed(2)}]
        return dados
        
    } catch (error) {
        console.log(error)
        return {isSucesso: false, message: 'Ops... Ocorreu um erro ao exibir contadores...'}
    }finally{
        conexao.closeConnection(con);
    }

}


async function GetValores(lista){
    let listaAtivos = []
    let data = []
    var total = 0
    try {
        listaAtivos = await ApiGoogle.LerGoogleSheets()
        data = await lista.map(async (item)=>{
            let valor = await ApiGoogle.GetValorAtivo(listaAtivos, item.PAPEL)
            
            if(valor == 0 || valor == null){
                item.TOTAL_ATUAL = 0
            }else{
                item.TOTAL_ATUAL = parseFloat(valor)*parseInt(item.QUANTIDADE)
            }
            
            total = total + item.TOTAL_ATUAL
            item.TOTAL_GERAL = total
            return item;
        })
        
        return Promise.all(data)
    } catch (error) {
        console.log(error)
    }
}

async function MontaListaFiltrada(listaAtivos, tipo){
   const listaFiltrada = listaAtivos.filter((item)=> item.DESCRICAO === tipo);
   return listaFiltrada
}

async function somaValores(lista){ 
   const soma = await lista.reduce((total, lista)=> total + lista.TOTAL_ATUAL, 0)
   return soma
}

module.exports={
    Totalizadores
}