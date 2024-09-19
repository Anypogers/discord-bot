import dotenv from 'dotenv'
dotenv.config();
import prefixHandlers from './commands/prefixCommandHandlers.js'
import slashHandlers from './commands/slashCommandHandlers.js'

import {
  Client,
  GatewayIntentBits
} from 'discord.js';
import prefixCommands from './commands/prefixCommandHandlers.js';

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
  console.log(message)
  const text_message = message.content.slice(commandPrefix.length).trim().toLowerCase();
  const args = text_message.split(' ').slice(1); // Split the command and extract args
  const commandName = text_message.split(' ')[0]; // Extract the command name
  if (commandName in prefixHandlers) {
    try {
      prefixHandlers[commandName](message, ...args); // Pass the message object and args
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
  console.log(interaction)
  if (interaction.commandName in slashHandlers) {
    try {
      slashHandlers[interaction.commandName](interaction); // Pass the message object and args
    } catch (error) {
      console.error(`Error handling slash command "${interaction.commandName}":`, error);
    }
    return;
  }
});

client.login(process.env.DISCORD_TOKEN)