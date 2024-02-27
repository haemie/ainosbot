import {
  SlashCommandBuilder,
  CommandInteraction,
  ChatInputCommandInteraction,
} from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('rock paper scissors game!')

    .addStringOption((option) =>
      option
        .setName('rps')
        .setDescription('choose your fate')
        .addChoices(
          { name: 'rock', value: 'rock' },
          { name: 'paper', value: 'paper' },
          { name: 'scissors', value: 'scissors' }
        )
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    // console.log(targetuser);
    // console.log(interaction.member);

    // ephemeral to make message only visible to sender
    // console.log(interaction);

    const userSelection = interaction.options.getString('rps');
    const rps = ['rock', 'paper', 'scissors'];

    const selection = Math.floor(Math.random() * 3);

    const botSelection = rps[selection];

    let result;

    if (botSelection === userSelection) {
      result = 'tie';
      await interaction.reply({
        content: `bot chose ${botSelection}. you tied!`,
      });
    } else if (botSelection === 'rock' && userSelection === 'paper') {
      result = 'user';
      await interaction.reply({
        content: `bot chose ${botSelection}. ${result} wins!`,
      });
    } else if (botSelection === 'rock' && userSelection === 'scissors') {
      result = 'bot';
      await interaction.reply({
        content: `bot chose ${botSelection}. ${result} wins!`,
      });
    } else if (botSelection === 'paper' && userSelection === 'rock') {
      result = 'bot';
      await interaction.reply({
        content: `bot chose ${botSelection}. ${result} wins!`,
      });
    } else if (botSelection === 'paper' && userSelection === 'scissors') {
      result = 'user';
      await interaction.reply({
        content: `bot chose ${botSelection}. ${result} wins!`,
      });
    } else if (botSelection === 'scissors' && userSelection === 'rock') {
      result = 'user';
      await interaction.reply({
        content: `bot chose ${botSelection}. ${result} wins!`,
      });
    } else if (botSelection === 'scissors' && userSelection === 'paper') {
      result = 'bot';
      await interaction.reply({
        content: `bot chose ${botSelection}. ${result} wins!`,
      });
    }
  },
};
