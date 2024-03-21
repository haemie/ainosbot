import { Message } from 'discord.js';
import { scoutMessage } from '../../util/types';

function createMessage(obj: string[]) {
  let res = '';
  obj.forEach((e) => {
    res += `${e}\n`;
  });

  return '```' + res + '```';
}

export const returnMessage: scoutMessage = {
  clearscout: [],
  top1: [],
  top2: [],
  mid1: [],
  mid2: [],
  bot1: [],
  bot2: [],
  sh1: [],
  sh2: [],
};

// let lastScout: Message | null = null;

type lastScoutsType = {
  top1: Message | null;
  top2: Message | null;
  mid1: Message | null;
  mid2: Message | null;
  bot1: Message | null;
  bot2: Message | null;
  sh1: Message | null;
  sh2: Message | null;
};

const lastScouts: lastScoutsType = {
  top1: null,
  top2: null,
  mid1: null,
  mid2: null,
  bot1: null,
  bot2: null,
  sh1: null,
  sh2: null,
};

export async function gwHandler(message: Message, messageContent: string[]) {
  if (messageContent[0] === 'clearscout') {
    for (let e of Object.keys(returnMessage)) {
      const key = e as keyof scoutMessage;
      returnMessage[key].splice(0);
    }
    for (let e of Object.keys(lastScouts)) {
      const key = e as keyof lastScoutsType;
      lastScouts[key] = null;
    }
    await message.reply('cleared');
  } else if (messageContent[0] in returnMessage) {
    // console.log(message.author);
    // there should be scout data in this message now
    if (
      messageContent[0] in lastScouts &&
      lastScouts[messageContent[0] as keyof typeof lastScouts]
    ) {
      // check if there's a previous message to delete first
      await lastScouts[messageContent[0] as keyof typeof lastScouts]?.delete();
    }

    // save the target for command
    const key = messageContent[0] as keyof scoutMessage;

    // manipulate return message string
    // remove command name from return string
    messageContent.shift();

    // remove extra spaces from return
    const trimmedmessage = messageContent.join(' ').replace(/\s+/g, ' ').trim();

    // split command string into its lines
    const lines = trimmedmessage.split('\n');

    // add a header to the table:
    lines.unshift('Hero|HP|Speed|Artifact|Other');

    const rows = lines.map((line) => line.split('|'));

    // we now have an array of rows holding an array of columns each. column index width must be the same

    const colLengths = Array(5).fill(0);

    rows.forEach((ro, i) =>
      ro.forEach((co, j) => {
        colLengths[j] = Math.max(co.length, colLengths[j]);
      })
    );

    const paddedText = rows
      .map((ro, i) =>
        ro.map((co, j) => co.padEnd(colLengths[j], ' ')).join(' | ')
      )
      .join('\n');

    // add images from the user to the bot post
    let messageAttachments = '';
    if (message.attachments) {
      message.attachments.forEach((e) => {
        messageAttachments += e.proxyURL;
      });
    }

    returnMessage[key].push(paddedText);

    lastScouts[key as keyof lastScoutsType] = await message.reply({
      content:
        key +
        ' SCOUT BY ' +
        message.author.toString() +
        createMessage(returnMessage[key]) +
        messageAttachments,
      allowedMentions: {
        parse: [], // ping nobody
        repliedUser: false, // don't ping the replied user
      },
    });
  } else {
    // get command from the commands for this thing
  }
}
