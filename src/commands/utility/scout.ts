import {
  SlashCommandBuilder,
  CommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalActionRowComponentBuilder
} from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder().setName('modal').setDescription('modal test'),
  async execute(interaction: CommandInteraction) {
    // create modal for inputs
    const modal = new ModalBuilder()
      .setCustomId('myModalID')
      .setTitle('my modal title');

    // add components to modal

    // create text input components
    const favoriteColorInput = new TextInputBuilder()
      // id is unique identifier for input
      .setCustomId('favoritecolorinput')
      // label is what user sees as label for input
      .setLabel(`what's your favorite color?`)
      // placeholder
      .setPlaceholder('blue')
      // short means one line of text
      .setStyle(TextInputStyle.Short);

    const hobbiesInput = new TextInputBuilder()
      .setCustomId('hobbiesinput')
      .setLabel(`what's some your fav hobbies`)
      .setValue('gamin')
      .setStyle(TextInputStyle.Paragraph);

    // one action row holds one text input each
    const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(favoriteColorInput);
    const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(hobbiesInput);

    // add modals to input
    modal.addComponents(firstActionRow, secondActionRow);
    await interaction.showModal(modal);
  },
};
