import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('scout')
    .setDescription('Creates scouting report'),
  async execute(interaction: CommandInteraction) {
    // console.log(interaction);
    await interaction.reply('report');
  },
};
