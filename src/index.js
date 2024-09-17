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
  if (message.content === "Ping!"){
    message.reply("Pong!");
    console.log("PONG FUNCTION-ish");
    return;
  }
  if (message.content === "Test"){
    message.reply("[ULTRAKILL](http://devilmayquake.com)");
    console.log("ULTRAKILL FUNCTION-ish");
    return;
  }
  console.log(`Found no Matches for message "${message.content}"`);
});

client.login(process.env.DISCORD_TOKEN)