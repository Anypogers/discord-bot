import dotenv from 'dotenv';
dotenv.config();
import commandHandler from './commands/commandHandler.js'

import {
  Client,
  GatewayIntentBits
} from 'discord.js';

const commandPrefix = '&'; // Set your command prefix here

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

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(commandPrefix)) {
    return; // Ignore the message if it doesn't start with the prefix
  }
  if (message.author.bot) {
    return;
  }
  const commandName = message.content.slice(commandPrefix.length).trim().split(' ')[0]; // Extract the command name
  if (commandName.split(' ')[0] in commandHandler) {
    try {
      commandHandler[commandName](message); // Pass the message object and args
    } catch (error) {
      console.error(`Error handling prefix command "${commandName}":`, error);
    }
    return;
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()){
    return;
  }
  if (interaction.commandName in commandHandler) {
    try {
      commandHandler[interaction.commandName](interaction); // Pass the message object and args
    } catch (error) {
      console.error(`Error handling slash command "${interaction.commandName}":`, error);
    }
    return;
  }
});

client.login(process.env.DISCORD_TOKEN)