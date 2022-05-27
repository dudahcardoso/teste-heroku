require("dotenv").config();
let message = "";
const express = require("express"); //cria variável express, o require vai no node modules procura a pasta express e traz tudo que ele tem ali dentro

//dontenv
const port = process.env.PORT || 3000;

//passo2
const path = require("path"); // importar uma lib do próprio Express chamada path

const app = express(); //cria const app que é minha aplicação e chamo todas funções do express através desse app

//passo2
app.set("view engine", "ejs"); //motor engine view é ejs
app.use(express.static(path.join(__dirname, "public"))); //dizendo ao Express a pasta que irá guardar esses arquivos
app.use(express.urlencoded()); ////navegador envia informações pelo json e vem do body, pegar as informações do body (informações do input), vem do name e cria o json

//app.get("/",  (req, res) => {//chamando a rota get, dentro do servidor temos rotas que nossos clientes irão acessar o que chamamos de endpoints, o cliente faz a requisição e acessa o endpoint que é uma rota e dentro dessa rota é executada uma função e responde meu cliente
//res.send("Hello World");//resposta ao cliente o send envia
//});

app.get("/home", (req, res) => {
  //acessei a rota home e ele me respondeu o que tem dentro da função
  res.send("Olá mundo do EXPRESS!");
});

//passo2-ejs
app.get("/", (req, res) => {
  const devList = ["Backend", "Frontend", "Fullstack"];
  const analyticsList = ["Engenharia de dados", "Ciência de dados"];
  res.render("index", {
    titulo: "Blue",
    devList: devList,
    analyticsList: analyticsList,
    message
  }); //render para renderizar a página HTML
});

setTimeout(() => {
  message = "";
}, 1000);


app.post("/subscription", (req, res) => {
  //const { nome, email } = req.body;//desconstrução do objeto para receber os dados que chegam do body da nossa requisição, sim os dados do formulário chegam através desse atributo body, que pertence ao objeto req da requisição
  //res.send({ nome: nome, email: email });// mostramos os dados através do objeto res, enviando via send um JSON, perceba que dentro dos parênteses nós abrimos chaves, o que configura um novo objeto JSON, dai então passamos o atributo nome, com o valor nome, e o atributo email, com o valor email, os valores vem do nosso objeto body, e os atributos nós mesmos criamos, logo eles não precisam ter exatamente esse nome, mas os valores precisam.
  const { nome, email } = req.body;
  message = `Parabéns ${nome}, sua inscrição foi realizada com sucesso! Um e-mail foi enviado para: ${email}`;
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:{port}`)
); //ouvir a porta 3000, rodando nessa porta
