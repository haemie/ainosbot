import { Client, Collection } from "discord.js";
import { newClientInterface } from "./types";

// class DiscordManager {
//   client: Client;
//   commands: Collection<string, Command>;
//   constructor(intents: any) {
//     this.client = new Client(intents);
//     this.commands = new Collection();
//   }
// }

class newClient extends Client implements newClientInterface {
  commands: Collection<string, any>
  constructor(intents: any) {
    super(intents);
    this.commands = new Collection()
  }
}

export default newClient;