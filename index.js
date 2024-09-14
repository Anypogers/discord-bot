const { Client, GatewayIntentBits } = require('discord.js');
const db = require('./database');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const MIN_MONEY = 1;
const MAX_MONEY = 5;

client.once('ready', () => {
    console.log('Ready!');
    db.setupDatabase();
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === 'Give me some money!') {
        const amount = Math.floor(Math.random() * (MAX_MONEY - MIN_MONEY + 1)) + MIN_MONEY;
        db.updateUserBalance(message.author.id, amount);
        message.channel.send(`You have received $${amount}.`);
    }

    if (message.content === 'Buy Bread') {
        db.getUserBalance(message.author.id, (err, balance) => {
            if (err) return message.channel.send('Error checking balance.');
            if (balance >= 5) {
                db.updateUserBalance(message.author.id, -5);
                db.updateUserBread(message.author.id, 1);
                message.channel.send('You bought a bread for $5.');
            } else {
                message.channel.send('You do not have enough money to buy bread.');
            }
        });
    }

    if (message.content === 'ping!') {
        db.getPingPongCount((err, count) => {
            if (err) return message.channel.send('Error retrieving ping pong count.');
            db.incrementPingPongCount();
            message.channel.send('Pong!');
        });
    }

    if (message.content === 'Random number') {
        const randomNumber = (Math.random() * 10).toFixed(2);
        db.insertRandomNumber(randomNumber);
        message.channel.send(`Random number: ${randomNumber}`);
    }
});

// const { getUserField, updateUserField } = require('./data_manager');

// // Example: Get the 'theme' preference for user with ID 1
// const userId = "1";
// const theme = getUserField(userId, 'theme');
// console.log(`User ID ${userId} theme:`, theme);

// // Example: Update the 'theme' preference for user with ID 1
// updateUserField(userId, 'theme', 'light');

// // Verify the update
// const updatedTheme = getUserField(userId, 'theme');
// console.log(`Updated theme for user ID ${userId}:`, updatedTheme);

// // Example: Get a top-level field like 'username'
// const username = getUserField(userId, 'username');
// console.log(`Username for user ID ${userId}:`, username);

// // Example: Update a top-level field like 'username'
// updateUserField(userId, 'username', 'AliceUpdated');

// // Verify the update
// const updatedUsername = getUserField(userId, 'username');
// console.log(`Updated username for user ID ${userId}:`, updatedUsername);


client.login('DISCORD_BOT_TOKEN');
