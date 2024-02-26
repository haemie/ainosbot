import { Events, Message } from 'discord.js';
import { scoutMessage } from '../util/types';

function createMessage(obj: scoutMessage) {
  let res = '';
  for (const [key, value] of Object.entries(obj)) {
    let valuestring = '';
    res += `# ${key}:\n${value.join('\n')}\n`;
  }
  return res;
}

const returnMessage: scoutMessage = {
  top1: [],
  top2: [],
  mid1: [],
  mid2: [],
  bot1: [],
  bot2: [],
  sh1: [],
  sh2: [],
};

let lastScout: Message | null = null;

module.exports = {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (message.author.bot) return;

    const messageContent = message.content.split(' ');
    if (messageContent[0] === 'clearall') {
      for (let e of Object.keys(returnMessage)) {
        const key = e as keyof scoutMessage;
        returnMessage[key].splice(0);
      }
      lastScout = null;
      await message.reply('cleared');
    } else if (!(messageContent[0] in returnMessage)) {
      return;
    } else {
      if (lastScout) {
        await lastScout.delete();
      }
      const key = messageContent[0] as keyof scoutMessage;
      returnMessage[key].push(messageContent.slice(1).join(' '));

      lastScout = await message.reply(createMessage(returnMessage));
    }
  },
};
