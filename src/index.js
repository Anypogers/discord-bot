import dotenv from 'dotenv'
dotenv.config();

import {
  Client,
  GatewayIntentBits
} from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ]
});

const commandHandlers = require('./commandHandlers');

client.on('ready', (c) => {
  console.log(`${c.user.username} is online.`);
  console.log(`ID = ${c.user.id}`);
});

client.on("messageCreate", (message) => {
  
  console.log("Message Received... Analizing...")
  if (message.author.bot) {
    console.log("Bot Message, +gitIGNORE")
    return;
  }
  const text_message = message.content.trim();
  const args = text_message.split(' ').slice(1); // Split the command and extract args
  const commandName = text_message.split(' ')[0]; // Extract the command name
  if (commandName in commandHandlers) {
    try {
      commandHandlers[commandName](message, ...args); // Pass the message object and args
    } catch (error) {
      console.error(`Error handling command "${commandName}":`, error);
    }
    return;
  }
  console.log(`Found no Matches for message "${message.content}"`);
});

client.login(process.env.DISCORD_TOKEN)