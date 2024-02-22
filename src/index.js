import dotenv from 'dotenv';
// Require the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const commands = [];

for (const folder of commandFolders) {
  const commandPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith('.js'));

  // async function as we will be dynanmically importing commands
  (async () => {
    for (const file of commandFiles) {
      const filePath = path.join(commandPath, file);

      // imports will be on the default key of the returned object
      const { default: command } = await import(filePath);
      commands.push(command);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        // console.log(commands);
        if (!('data' in command)) {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required 'data'`
          );
        }
        if (!('execute' in command)) {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required 'execute'`
          );
        }
      }
    }
  })();
}
// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  if (readyClient.user) {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  const command = interaction.client.command.get(interaction.commandName);

  if (!command) {
    console.error(`no command matching ${interaction.commandName} was found`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
