import { SlashCommandBuilder } from 'discord.js';

/**
 * exports object with
 * {
 * data: slashcommand {name: 'ping', description: 'replies with pong'}
 * execute: (interaction) => {}
 * }
 */
export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
