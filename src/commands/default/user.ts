import { SlashCommandBuilder, CommandInteraction, GuildMember } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
  async execute(interaction: CommandInteraction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    if (!(interaction.member instanceof GuildMember)) return;
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member?.joinedAt}.`
    );
  },
};
