import { Client, Collection } from 'discord.js';
export interface newClientInterface extends Client {
  commands: Collection<string, any>;
}

export interface scoutMessage {
  clearscout: string[];
  top1: string[];
  top2: string[];
  mid1: string[];
  mid2: string[];
  bot1: string[];
  bot2: string[];
  sh1: string[];
  sh2: string[];
}

// export interface Command {
//   name: string,
//   description: string,
//   aliases?: Array<string>,
//   usage: string,
//   execute(): void,
//   guildOnly?: boolean,
//   permissions: string,
//   args?: boolean,
// }
