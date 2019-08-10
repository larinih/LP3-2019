const requisicao = require('supertest');
const app = require('./app');
describe('Testa o serviço de inversão de strings', () => {
    test('Deve retornar a string original de forma invertida', async () => {
        let str = 'animal';
        /**
         * Realiza uma requisição ao serviço de inversão de strings passando a palavra "animal" como parametro.
         * A resposta do serviço será armazenada na variável resposta
         */
        let resposta = await requisicao(app).get(`/inverter/${str}`); 
        // body representa o corpo da resposta
        //let abacaxi = resposta.body.resultado
        let { resultado } = resposta.body;
        /**
         * Espero que o valor da variável resultado seja igual a "lamina"
         */
        expect(resultado).toBe('lamina');
        str = 'Sidney';
        resposta = await requisicao(app).get(`/inverter/${str}`);
        ({resultado} = resposta.body);
        expect(resultado).toBe('yendiS');
    

    });
 });

 describe('Testa o serviço de validação de CPFs', () => { 
     test('Deve retornar true ao receber um CPF válido', async () => {
        const cpfsValidos = [
            '86782870207',
            '66090156604',
            '86168645632',
            '44382823064'
        ];

        for(let i = 0; i <cpfsValidos.length; i++){
            let resposta = await requisicao(app).get(`/cpf/${cpfsValidos[i]}`);
            let { valido } = resposta.body; 
            expect(valido).toBe(true);
        }
     });

     test('Deve retornar false ao receber um CPF inválido', async () =>{
         const cpfsInvalidos = [
            '12345',
            'abv',
            '000000000',
            '00382823064'
         ];

         for(let i = 0; i <cpfsInvalidos.length; i++){
            let resposta = await requisicao(app).get(`/cpf/${cpfsInvalidos[i]}`);
            let { valido } = resposta.body; 
            expect(valido).toBe(false);
        }
     });
 });
