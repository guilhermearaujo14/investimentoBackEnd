const LoginModel = require('../../model/Login/Login');
const brcrypt = require('bcryptjs');

async function Login(req, res){

    const { CPF, SENHA } = req.body;
    const senhaInformada = SENHA;
    try {
        console.log(senhaInformada)

        const retorno = await LoginModel.Login(CPF);
        const senhaCapturadaBD = retorno.usuario[0].SENHA
        if(retorno.isSucesso){

                const isSenhasIguais = await brcrypt.compare(senhaInformada, senhaCapturadaBD)
                if(isSenhasIguais){
                    const nomeUsuarioLogado = retorno.usuario[0].NOME
                    return res.status(201).json({isSucesso: true, id:  retorno.usuario[0].ID, usuario: nomeUsuarioLogado})        
                }else{
                return res.status(500).json({Message: 'Ops... Senha incorreta!'})
                }    
            
        }
        
        return res.status(500).json({Message: 'Ops... Não foi possivel realizar o login!'})
    } catch (error) {
        //console.log(error)
        return res.status(400).json({Message: 'Ops.. Não foi possível realizar o login, verifique CPF e Senha se estão corretos!'})
    }

}

module.exports = {
    Login
}