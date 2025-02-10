import * as response from './responses/index.js';

const commands = {
  'rng': async (command) => {
    const min = getArgs(command)[0];
    const max = getArgs(command)[1];
    response.rng(command, min, max);
  },
  'echo': async (command) => {
    const message = getMessage(command);
    response.echo(command, message);
  },
}

function getMessage(command){
  if (isInteraction(command)){
    return command.commandName;
  }
  const result = command.content.split(" ").slice(1).join(" ");
  return result;
}
  
function getArgs(command){
  if (isInteraction(command)){
    try{
      const result = command.options._hoistedOptions.map(option => option.value);
      return result;
    } catch (error) {
      console.log("error handelling 'getArgs' function inside 'commandHandlers.js'\n", error)
    }
    return null;
  }
  const result = getMessage(command).split(' ').slice(1);
  return result;
}

function isInteraction(command){
  try {
    const isInteraction = command.isCommand && command.commandName !== undefined;
    return isInteraction;
  } catch (error) {
    console.log("error handelling 'isInteraction' function inside 'commandHandlers.js'\n", error)
  }
}

function getUserId(command){
  if (isInteraction(command)){
    return (command.user.id);
  } else {
    return (command.author.id);
  }
}

export default commands;