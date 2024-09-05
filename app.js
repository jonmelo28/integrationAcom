// app.js
const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT || 3000;


// URL da API
let Uri = process.env.URL;

// Token de autenticação (exemplo)
const authToken = process.env.AUTH_TOKEN;

//cnpj da empresa
const cnpj_empresa =  process.env.CNPJ_EMPRESA;

// Middleware para processar JSON
app.use(express.json());

app.post('/getInfoForn', async (req, res) =>{

const apiUrl = Uri += '00007';

// Dados a serem enviados no corpo da requisição
const requestData = {
    "filtro": {
            "cnpj_empresa": `${cnpj_empresa}`,
            "token": `${authToken}`,
            "pagina": "1",
            "itensporpagina": "100",
            "cd_item": "100017",
            "ds_item": "",
            "ds_ggrupo": "",
            "ds_grupo": "",
            "ds_sgrupo": "",
            "ds_marca": ""
        }  
};

// Função assíncrona para realizar a requisição POST
const makePostRequest = async () => {
  try {
    const response = await axios.post(apiUrl, requestData);

    //console.log('Response:', response.data);
   // console.log(response);
    response.data.resultados.itens.forEach((item, index) => {
      console.log(`Item ${index}:`, item);
      return res.status(200).send({item});
    });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};
// Chama a função
makePostRequest();
  
  });
  

  app.post('/getInfoFornProd', async (req, res) =>{

    const apiUrl = Uri += '00006';

    // Dados a serem enviados no corpo da requisição
    const requestData = {
        "filtro": {
                "cnpj_empresa": `${cnpj_empresa}`,
                "token": `${authToken}`,
                "pagina": "1",
                "itensporpagina": "100",
                "cd_item": ""
            }  
    };
    
    // Função assíncrona para realizar a requisição POST
const makePostRequest = async () => {
  try {
    const response = await axios.post(apiUrl, requestData);

     console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};
// Chama a função
makePostRequest();
  
  });

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando no endereço http://localhost:${port}`);
  });
