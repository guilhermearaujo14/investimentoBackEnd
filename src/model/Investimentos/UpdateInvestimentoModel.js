const { json } = require('express');
const conexao = require('../../../db/config')

async function UpdateInvestimentoModel(TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR,  DATA_COMPRA, ID ){
try {
    const con = await conexao();
    const TOTAL_INVESTIDO = QUANTIDADE * VALOR;
    await con.execute('UPDATE INVESTIMENTOS SET TIPO_ATIVO_ID = ?, PAPEL = ?, NOME_EMPRESA = ?, SETOR = ?, QUANTIDADE = ?, VALOR = ?, TOTAL_INVESTIDO = ?, DATA_COMPRA = ? WHERE ID = ?', 
    [TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, TOTAL_INVESTIDO,  DATA_COMPRA, ID]);

    return await 'Ativo atualizado com sucesso'
} catch (error) {
    return 'ERROR: Não foi possível atualizar ativo... '+error
}
}

module.exports = {
    UpdateInvestimentoModel
}