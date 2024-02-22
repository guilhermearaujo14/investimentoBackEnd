const RegistraVendaModel = require('../../model/Investimentos/RegistrarVendaModel');

async function RegistrarVenda(req, res){
    const {USUARIO_ID} = req.params;
    const  { PAPEL, QUANTIDADE, VALOR, DATA_COMPRA } = req.body;
    try {
        const result = await RegistraVendaModel.RegistrarVenda(USUARIO_ID, PAPEL, QUANTIDADE, VALOR, DATA_COMPRA);
        
        return res.status(200).json(result[0])
    } catch (error) {
        
        return res.status(400).json(error);
    }
}

module.exports = {
    RegistrarVenda
}