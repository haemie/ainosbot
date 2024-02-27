import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  GuildMember,
} from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Provides information about.')
    .addSubcommand(
      (subcommand) =>
        subcommand
          .setName('user')
          .setDescription('Get information on a user')
          .addUserOption((option) =>
            option.setName('targetuser').setDescription('target user')
          )
      // .addUserOption((option) =>
      //   option.setName('otheruser').setDescription('target user')
      // )
    )
    .addSubcommand((subcommand) =>
      subcommand.setDescription('get information on server').setName('server')
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    if (!(interaction.member instanceof GuildMember)) return;
    // console.log(interaction.options);
    if (interaction.options.getSubcommand() == 'user') {
      const targetuser = interaction.options.getUser('targetuser');
      const otheruser = interaction.options.getUser('otheruser');
      if (targetuser) {
        const user1 = await interaction.guild?.members.fetch(targetuser.id);
        await interaction.reply(
          `Retreiving data for ${user1?.displayName}. who joined on ${user1?.joinedAt}`
        );
        // if (otheruser) {
        //   const user2 = await interaction.guild?.members.fetch(otheruser.id);

        //   await interaction.reply(`${user1?.joinedAt} ${user2?.joinedAt}`);
        // }
      } else {
        await interaction.reply(
          `This command was run by ${interaction.user.username}, who joined on ${interaction.member?.joinedAt}.`
        );
      }
    } else if (interaction.options.getSubcommand() == 'server') {
      await interaction.reply(
        `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
      );
    }
  },
};
