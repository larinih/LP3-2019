// bibliotecas para realizar testes automatizados no express
// jest
// supertest
// superagent
// dependencias de desenvolvimento
// npm i --save-dev jest supertest superagent ou npm i -D jest supertest superagent
// o script app.js é o nosso alvo de testes
// Jest: sale executar testes e fazer asserts
// Assert: consiste em verificar um caso de teste
// iremos criar, ao lado do arquivo app.js, um arquivo chamado app.test.js 
// nossos testes sao baseados em histórias
// `/inverter/${str}` -> no js, isto é chamado de strings literals
// destructuring association => associação por desestruturação
//Lembre se requisições não são sincronas 
const express = require('express');

const app = express();

// Nossos web services
app.use('/data', (req, res) => {
    let dataAtual = new Date();
    dataAtual = dataAtual.toLocaleDateString();
    res.json(dataAtual);
});

app.use('/inverter/:str', (req, res) => {
    // Recupera a variável de parâmetro
    let str = req.params.str;
    // Inverte a string
    str = str.split('').reverse().join('');
    res.json({ resultado: str});
});

app.use('/cpf/:cpf', (req, res) => {
    let cpf = req.params.cpf;
    cpf = cpf.replace(/\D/g, '');
    const validarCpf = require('validar-cpf');
    resposta = validarCpf(cpf) 
    if (resposta == true) 
        res.json({ valido: true});
    else
        res.json({ valido: false});
    res.send('Validador de CPF');
});


module.exports = app;