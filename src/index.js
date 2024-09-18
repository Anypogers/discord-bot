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
})

client.on("messageCreate", (message) => {
  console.log("Message Received... Analizing...")
  if (message.author.bot) {
    console.log("Bot Message, +gitIGNORE")
    return;
  }
  if (command in commandHandlers) {
    commandHandlers[command](message, ...args); // Pass the message object and args
    return;
  }
  console.log(`Found no Matches for message "${message.content}"`);
});

client.login(process.env.DISCORD_TOKEN)