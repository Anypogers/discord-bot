const prefixCommands = {
  'ping': (message) => {
    message.reply('Pong!');
  },
  'echo': (message, ...args) => {
    const response = args.join(' ');
    message.reply(response || 'Uhhhh, maybe tell me *what* to echo? `&echo %message%`');
  },
  'rng': (message, min, max) => {
    // Parse the min and max values from the arguments
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    // Check if the parsed values are valid numbers
    if (isNaN(minVal) || isNaN(maxVal)) {
      message.reply('I don\'t think those are numbers...');
      return;
    }
    // Ensure minVal is less than or equal to maxVal
    if (minVal > maxVal) {
      message.reply('The maximum value needs to be *bigger* than the minimum value, **not** *smaller*');
      return;
    }
    // Generate a random number between minVal and maxVal (inclusive)
    const randomNumber = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    // Reply with the generated random number
    message.reply(`Random number between ${minVal} and ${maxVal}: ${randomNumber}`);
  },
};

function rpsWinner(choice1, choice2) {
  if (choice1 === choice2) {
    return "It's a tie!";
  }
  if (
    (choice1 === 'rock' && choice2 === 'scissors') ||
    (choice1 === 'scissors' && choice2 === 'paper') ||
    (choice1 === 'paper' && choice2 === 'rock')
  ) {
    return `${choice1} beats ${choice2}. Player 1 wins!`;
  }
  return `${choice2} beats ${choice1}. Player 2 wins!`;
}

export default prefixCommands;