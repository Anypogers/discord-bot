export function rng(command, min, max){
  const minVal = parseInt(min);
  const maxVal = parseInt(max);
  if (min == undefined){
    command.reply('... A random number between *what values*?');
    return;
  }
  if (max == undefined){
    command.reply('Uhhh, I need a max value...');
    return;
  }
  if (isNaN(minVal) || isNaN(maxVal)) {
    command.reply(`I need *two numbers*... you know... to get a random *number* between them?`);
    return;
  }
  if (minVal > maxVal) {
    command.reply('The maximum value needs to be *bigger* than the minimum value, **not** *smaller*');
    return;
  }
  // Generate a random number between minVal and maxVal (inclusive)
  const randomNumber = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
  // Reply with the generated random number
  command.reply(`Random number between ${minVal} and ${maxVal}: ${randomNumber}`);
}