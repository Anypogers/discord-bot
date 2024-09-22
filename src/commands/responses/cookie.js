const gameState = [
  {
    ammount : 0,
  },
];

export function cookie(command, choice, isInteraction){
  if (choice == 'click'){
    gameState[0].ammount += 1;
    command.reply(`You clicked the cookie!`)
  } else if (choice == 'eat'){
    gameState[0].ammount -= 1
    command.reply(`You ate one cookie!`)
  } else if (Math.random() < 0.2 && gameState[0].ammount > 1) {
    gameState[0].ammount -= 1
    command.channel.send(`The sever has ${gameState[0].ammount} cookies!`);
    command.channel.send(`That is one less than it's supposed to be, thats because I ate one!`)
    return;
  }
  let complement;
  switch(gameState[0].ammount){
    case 0:
      complement = 's...';
      break;
    case 1:
      complement = '!'
      break;
    case 69:
      complement = 's! *(nice)*';
      break;
    default:
      complement = 's!'
  }
  command.channel.send(`The sever has ${gameState[0].ammount} cookie${complement}`);
}