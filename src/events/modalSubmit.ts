import {
  Events,
  Interaction,
  MessageComponentInteraction,
  EmbedBuilder,
} from 'discord.js';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    if (!interaction.isModalSubmit()) {
      return;
    }

    console.log(interaction.fields);
    interaction
      .reply({ content: 'Pong!', fetchReply: true })
      // fetchreply: true to get the sent message inside next callback function
      .then((message) =>
        console.log(`Reply sent with content ${message.content}`)
      )
      .catch(console.error);

    // // Create an ephemeral reply with an embed
    // const embed = new EmbedBuilder().setDescription('Pong!');

    // interaction.reply({ embeds: [embed], ephemeral: true })
    //   .then(() => console.log('Reply sent.'))
    //   .catch(console.error);

    // try {
    //   await command.execute(interaction);
    //   console.log('interactioncreate command executed');
    // } catch (error) {
    //   console.error(error);
    //   if (interaction.replied || interaction.deferred) {
    //     await interaction.followUp({
    //       content: 'There was an error while executing this command!',
    //       ephemeral: true,
    //     });
    //   } else {
    //     await interaction.reply({
    //       content: 'There was an error while executing this command!',
    //       ephemeral: true,
    //     });
    //   }
    // }
  },
};
