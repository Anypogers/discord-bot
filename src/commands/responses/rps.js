const gameState = [
  {
    name: null,
    choice: null
  },
  {
    name: null,
    choice: null
  },
];

export function rps(command,choice, isInteraction){
  if (!isInteraction){
    if (gameState[0].name == null) {
      command.channel.send("There are no current running games!");
      command.channel.send("To start a game, use `/rps {choice}`!");
    } else if (gameState[1].name == null) {
      command.channel.send(`There is an ongoing rock paper scissor game that ${gameState[0].name} started!`);
      command.channel.send("To participate, use `/rps {choice}`!");
    } else {
      command.channel.send("The chances of you getting this message is really low!");
      command.channel.send("Because for this message to appear, there must be a completed game happening!");
      command.channel.send("*(Or the code is broken... That could also do it...)*");
    }
    return;
  }
  if(gameState[0].name == null){
    gameState[0].name = command.user.globalName;
    gameState[0].choice = choice;
    command.reply({
      content: `You chose: ${choice}`,
      ephemeral: true
    });
  } else if (gameState[1].name == null){
    if (gameState[0].name == command.user.globalName){
      gameState[0].choice = choice;
      command.reply({
        content: `You changed your choice to: ${choice}`,
        ephemeral: true
      });
    } else {
      gameState[1].name = command.user.globalName;
      gameState[1].choice = choice;
      command.reply({
        content: `You chose: ${choice}`,
        ephemeral: true
      });
    }
  }
  const whoWon = decideWinner();
  if (gameState[1].name != null){
    command.channel.send("The rock paper scissors game is done!")
    command.channel.send(`It was a game between @${gameState[0].name} and @${gameState[1].name}!`)
    if (whoWon == 2){
      command.channel.send(`And... it was **tie!**`)
    } else {
      command.channel.send(`And... ${gameState[whoWon].name} **won!!!**`)
    }
    command.channel.send(`${gameState[0].name}'s choice: ${gameState[0].choice}`);
    command.channel.send(`${gameState[1].name}'s choice: ${gameState[1].choice}`);
    command.channel.send(`${getEmoji(gameState[0].choice)} :vs: ${getEmoji(gameState[1].choice)}`)
    resetGame();
  }
}

function getEmoji(choice){
  if (choice == 'rock') return ':rock:'
  if (choice == 'paper') return ':roll_of_paper:'
  if (choice == 'scissors') return ':scissors:'
}

function decideWinner(){
  const player1 = gameState[0].choice;
  const player2 = gameState[1].choice;
  if (
    (player1 == 'rock' && player2 == 'scissors') ||
    (player1 == 'paper' && player2 == 'rock') ||
    (player1 == 'scissors' && player2 == 'paper')
  ){
    return 0
  } else if (player1 == player2) {
    return 2
  } else {
    return 1
  }
}

function resetGame(){
  gameState[0].name = null;
  gameState[0].choice = null;
  gameState[1].name = null;
  gameState[1].choice = null;
}