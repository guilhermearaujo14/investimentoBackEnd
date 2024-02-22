
const request = require("request");
const http = require("http");



function buscaDados(papel){
    const baseURL = `http://gsx2json.com/api?id=1AcWSEYKTeQxjEUTUs-GP08z_jVb8hemQFsKV6IJl71I&sheet=base&Papel=${papel}`;
    
    request(baseURL, (err, res, body) =>{
        const response = JSON.parse(body)
        console.log(response.rows)
    })
}


function PercorreArray(){
    console.log('----- EXECUTANDO TIMER ------')
    let array = ['BBPO11','BCFF11','DEVA11','IRDM11','VGHF11','VRTA11','MXRF11','GLOG11','HGLG11','SNAG11','HGRE11','XPML11', 'GOAU3','CMIG4','CSMG3','TAEE11','BIVE39','HASH11','B3SA3','OIBR4','IRBR3','VALE3']
    array.forEach((item)=>{
         buscaDados(item)
    })
}

setInterval(()=>PercorreArray(), 100000)
module.exports = { PercorreArray }