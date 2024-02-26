class Investimento {
    constructor(ID, USUARIO_ID, TIPO_ATIVO_ID, PAPEL, NOME_EMPRESA, SETOR, QUANTIDADE, VALOR, TOTAL_INVESTIDO, DATA_COMPRA, DATA_INCLUSAO, isCOMPRA, isVENDA){
        this.ID = ID;
        this.USUARIO_ID = USUARIO_ID;
        this.TIPO_ATIVO_ID = TIPO_ATIVO_ID;
        this.PAPEL = PAPEL;
        this.NOME_EMPRESA = NOME_EMPRESA;
        this.SETOR = SETOR;
        this.QUANTIDADE = QUANTIDADE;
        this.VALOR = VALOR;
        this.TOTAL_INVESTIDO = TOTAL_INVESTIDO;
        this.DATA_COMPRA = DATA_COMPRA;
        this.DATA_INCLUSAO = DATA_INCLUSAO;
        this.isCOMPRA = isCOMPRA;
        this.isVENDA = isVENDA;
    }
}

module.exports = {Investimento}

