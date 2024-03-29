import dotenv from 'dotenv';
dotenv.config();
// Require the necessary discord.js classes
import fs from 'fs';
import path from 'path';
import { GatewayIntentBits } from 'discord.js';
import newClient from './util/newClient';

const token = process.env.TOKEN;
const targetFileExtension =
  process.env.NODE_ENV === 'development' ? '.ts' : '.js';
// Create a new client instance
const client = new newClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

/** creating collection to hold commands from /commands directory  */
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  // don't check message type commands
  if (folder !== 'message') {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(targetFileExtension));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported function
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
}

/** adding event listeners for all events in /events directory */
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(targetFileExtension));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Log in to Discord with your client's token
client.login(token);
