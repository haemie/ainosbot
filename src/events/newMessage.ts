import { Events, Message } from 'discord.js';
import { scoutMessage } from '../util/types';

function createMessage(obj: scoutMessage) {
  let res = '';
  for (const [key, value] of Object.entries(obj)) {
    let valuestring = '';
    res += `# ${key}:\n${(value as string[]).join('\n')}\n`;
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

    if (messageContent[0] === 'clearscout') {
      for (let e of Object.keys(returnMessage)) {
        const key = e as keyof scoutMessage;
        returnMessage[key].splice(0);
      }
      lastScout = null;
      await message.reply('cleared');
    } else if (messageContent[0] in returnMessage) {
      // console.log(message.author);
      // there should be scout data in this message now
      if (lastScout) {
        // check if there's a previous message to delete first
        await lastScout.delete();
      }

      if (message.attachments) {
        message.attachments.forEach((e) => {
          messageContent.push(e.proxyURL);
        });
      }

      // save the target for command
      const key = messageContent[0] as keyof scoutMessage;

      // manipulate return message string
      messageContent[0] = message.author.toString();
      returnMessage[key].push(messageContent.join(' '));

      lastScout = await message.reply({
        content: createMessage(returnMessage),
        allowedMentions: {
          parse: [], // ping nobody
          repliedUser: false, // don't ping the replied user
        },
      });
    } else {
      // get command from the commands for this thing
    }
  },
};
