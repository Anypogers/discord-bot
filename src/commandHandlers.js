const commandHandlers = {
    'hello': (message) => {
        message.reply('Hello there!'); // Reply with a message
    },
    'help': (message) => {
        message.reply('Here are the commands: !hello, !help, !ping');
    },
    'ping': (message) => {
        message.reply('Pong!');
    },
    'add': (message, a, b) => {
        const sum = Number(a) + Number(b);
        message.reply(`The sum is ${sum}`);
    },
};