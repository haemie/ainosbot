const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('scout')
    .setDescription('Creates scouting report'),
  async execute(interaction) {
    // console.log(interaction);
    await interaction.reply('report');
  },
};
