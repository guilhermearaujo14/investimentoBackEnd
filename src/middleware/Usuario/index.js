function validaFormulario(req, res, next){
    const {NOME, CPF, EMAIL} = req.body;

    if(NOME === '' || NOME === undefined){
        return res.send('NOME é obrigatório, verifique!')
    }
    if(CPF === '' || CPF === undefined){
        return res.send('CPF é obrigatório, verifique!')
    }
    if(EMAIL === '' || EMAIL === undefined){
        return res.send('EMAIL é obrigatório, verifique!')
    }else{
        next()
    }
}

module.exports = {validaFormulario};