// Desenvoldo por: Bee Solutions //
// Autor: Fernando Almondes //
// Data: 12/09/2023 //

const venom = require('venom-bot');

venom.create({ session: 'API-ZAP-BEE' })
  .then(async (client) => {
    const groups = await client.getAllChatsGroups();
    console.log('Groups:', groups);
    client.close();
  })
  .catch((error) => {
    console.log(error);
  });