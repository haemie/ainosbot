import { Events, Message } from 'discord.js';
import { gwHandler, returnMessage } from '../commands/message/gw';

module.exports = {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (message.author.bot) return;

    const messageContent = message.content.split(' ');

    if (messageContent[0] in returnMessage) gwHandler(message, messageContent);
  },
};
