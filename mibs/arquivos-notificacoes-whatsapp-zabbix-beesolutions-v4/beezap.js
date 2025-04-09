// Desenvoldo por: Bee Solutions //
// Autor: Fernando Almondes //
// Data: 12/09/2023 //

var express = require("express");
var venom = require("venom-bot");

//venom.create().then((client) => start(client)).catch((error) => {
//  console.error('Erro ao iniciar o cliente Venom:', error);
//});

venom
  .create({
    session: 'API-ZAP-BEE' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  var app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(4000, () => {
    console.log("Servidor rodando na porta 4000");
  });

// Envio pelo navegador (By: Bee Solutions) //

  app.get("/api/message", async (req, res, next) => {
    console.log("ChatID:", req.query.number);
    const chatid = req.query.number;

    const isGroup = (chatid) => {
      return chatid.toString().startsWith('55') && chatid.toString().length === 12;
    };

    try {
      if (isGroup(chatid)) {
        console.log('Enviando mensagem em número!');
        await client.sendText(req.query.number + '@c.us', req.query.message);
      } else {
        console.log('Enviando mensagem em um grupo!');
        await client.sendText(req.query.number + '@g.us', req.query.message);
      }
      res.json(req.query);
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      res.status(500).json({ error: 'Erro ao enviar a mensagem' });
    }
  });

// (By: Bee Solutions) //

// Envio pelo cURL com POST e data-raw (By: Bee Solutions) //

  app.post("/api/message", async (req, res, next) => {
    console.log("ChatID:", req.body.number);
    const chatid = req.body.number;

    const isGroup = (chatid) => {
      return chatid.toString().startsWith('55') && chatid.toString().length === 12;
    };

    try {
      if (isGroup(chatid)) {
        console.log('Enviando mensagem em número!');
        await client.sendText(req.body.number + '@c.us', req.body.message);
      } else {
        console.log('Enviando mensagem em um grupo!');
        await client.sendText(req.body.number + '@g.us', req.body.message);
      }
      res.json(req.body);
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      res.status(500).json({ error: 'Erro ao enviar a mensagem' });
    }
  });

// (By: Bee Solutions) //

  client.onMessage((message) => {
    if (message.body === 'Bee') {
      client.sendText(message.from, 'Bem-vindo a Bee Solutions!').catch((error) => {
        console.error('Erro ao enviar a resposta:', error);
      });
    }
  });
}
