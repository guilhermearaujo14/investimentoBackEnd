const axios = require('axios')

async function lerDados(papel){
    if(papel !=''){
        try {
            const result = await axios.get(`http://gsx2json.com/api?id=1AcWSEYKTeQxjEUTUs-GP08z_jVb8hemQFsKV6IJl71I&sheet=base&papel=${papel}`)
            const resultado = await result.data.rows
            //console.log(resultado[0].cotacao)
            const data = await resultado[0].cotacao.replace(',', '.')
            const n  = await parseFloat(data)
                return JSON.stringify(n)
        } catch (error) {
            console.log(error.data)
        }}else{
            return console.log('Error: Papel não selecionado')
        }
}
module.exports = { lerDados };