import { Client, Collection } from "discord.js"
export interface newClientInterface extends Client {
  commands: Collection<string, any>;
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

