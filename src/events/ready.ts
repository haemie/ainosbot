import { Events, Client } from 'discord.js';

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
  },
};

// client.once(Events.ClientReady, (readyClient) => {
//   console.log(`Ready! Logged in as ${readyClient.user.tag}`);
// });
