const { json } = require('express');
const conexao = require('../../../db/config')

async function DeleteInvestimentoModel(ID){
    try {
        const con = await conexao();
        const ID_Exclusao = ID;
        await con.execute('DELETE FROM INVESTIMENTOS WHERE ID = ?', [ID_Exclusao]);
        return await {isSucesso: true, MSG_Retorno: "deletado com sucesso"}
    } catch (error) {
        return {isSucesso: false, MSG_Retorno: "Erro ao excluir registro. => "+error}
    }
}

module.exports = {
    DeleteInvestimentoModel
}