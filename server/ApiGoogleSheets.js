const axios = require('axios')

async function LerGoogleSheets(){
    const baseURL = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.spreadsheets}/values/A1%3AD1900?majorDimension=DIMENSION_UNSPECIFIED&valueRenderOption=UNFORMATTED_VALUE&key=${process.env.API_KEY}`;
    try {
        
        const r = await axios.get(baseURL)
        const json = r.data.values
        const listaConvertida = await ConverteEmJson(json)
        return listaConvertida
    } catch (error) {
        console.log(error)
    }

}

function ConverteEmJson(data){
    const [chave1, chave2, chave3, chave4] = data.shift();
    const lista = data.map(item => ({
        [chave1]: item[0],
        [chave2]: item[1],
        [chave3]: item[2],
        [chave4]: item[3]
    }))

        return lista
}

function GetValorAtivo(lista, papel){
    const filtro = lista.filter((item) => item.papel == papel)
    return filtro.length > 0 ?  filtro[0].cotacao :  0  
}


module.exports = {
    LerGoogleSheets,
    GetValorAtivo
}


