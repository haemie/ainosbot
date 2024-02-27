import { SlashCommandBuilder, CommandInteraction } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')

    .addBooleanOption((option) =>
      option
        .setName('ephemeral')
        .setDescription('whether or not echo should be ephemeral')
    ),

  async execute(interaction: CommandInteraction) {
    // console.log(targetuser);
    // console.log(interaction.member);

    // ephemeral to make message only visible to sender
    // console.log(interaction);
    const ping = Date.now() - interaction.createdTimestamp;

    await interaction.reply({
      content: `Pong! *server took ${ping}ms to receive message*`,
      ephemeral: false,
    });
  },
};
