import dotenv from 'dotenv';
dotenv.config();
import commandHandler from './commands/commandHandler.js'

import {
  Client,
  GatewayIntentBits
} from 'discord.js';

const commandPrefix = '>'; // command prefix

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ]
});

client.on('ready', (c) => {
  console.log(`${c.user.username} is online.`);
  console.log(`ID = ${c.user.id}`);
});

client.on("messageCreate", async (message) => {
  // Ignore the message if it doesn't start with the prefix
  if (!message.content.startsWith(commandPrefix)) {
    return; 
  }
  // Ignore the message if it's made by a bot.
  if (message.author.bot) {
    return;
  }
  // this line is a mess to read...
  const commandName = message.content.slice(commandPrefix.length).trim().split(' ')[0].toLowerCase(); // Extract the command name
  if (commandName.split(' ')[0] in commandHandler) {
    try {
      await commandHandler[commandName](message); // Pass the message object and args
    } catch (error) {
      console.error(`Error handling prefix command "${commandName}":\n${error}`);
    }
    return;
  }
});

client.login(process.env.DISCORD_TOKEN)