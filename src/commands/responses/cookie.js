const gameState = {
  "ammount" : 0
};

export function cookie(command, choice, isInteraction){
  if (choice == 'click'){
    gameState.ammount += 1;
    command.reply(`You clicked the cookie!`)
  } else if (choice == 'eat'){
    gameState.ammount -= 1;
    command.reply(`You ate one cookie!`)
  } else if (Math.random() < 0.2 && gameState.ammount > 1) {
    gameState.ammount -= 1;
    command.channel.send(`The sever has ${gameState.ammount} cookies!`);
    command.channel.send(`That is one less than it's supposed to be, thats because I ate one!`)
    return;
  }
  let complement;
  switch(gameState.ammount){
    case 0:
      complement = 's...';
      break;
    case 1:
      complement = '!';
      break;
    default:
      complement = 's!';
  }
  command.channel.send(`The sever has ${gameState.ammount} cookie${complement}`);
}