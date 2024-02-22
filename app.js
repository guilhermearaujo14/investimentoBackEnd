const express = require("express");
const cors = require('cors')
const routes = require("./routes")

const app = express()
app.use(cors())
const porta = 3333;

app.use(express.json())

app.use('/', routes)
//routes


app.listen(porta, ()=>{
    console.log('Servidor rodando !');
})  


