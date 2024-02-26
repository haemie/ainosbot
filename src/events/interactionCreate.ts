import { Events, Interaction } from 'discord.js';
import newClient from '../util/newClient';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    // interaction.client.commands holds all commands
    /** retreive command function definition from the commands Collection on the Client object
     * based on the commandname passed with the interactionCreate command
     *
     * i.e. user issues command /ping,
     * creates an InteractionCreate event,
     * gets triggered by event listener created in index.ts,
     * callback to event is the execute() function in this file
     * execute() function in this file grabs command name "ping" and grabs execution for ping
     * runs ping execute() function
     */
    const command = (interaction.client as newClient).commands.get(
      interaction.commandName
    );
    // interaction.client.commands: Collection(5) [Map] {
    //   'ping' => { data: [SlashCommandBuilder], execute: [AsyncFunction: execute] },
    //   'server' => { data: [SlashCommandBuilder], execute: [AsyncFunction: execute] },
    //   'user' => { data: [SlashCommandBuilder], execute: [AsyncFunction: execute] }
    // },

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
      console.log('interactioncreate command executed');
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
  },
};
