import * as response from './responses/index.js';
const commandPrefix = '&';

const commands = {
  'ping': (command) => {
    response.ping(command);
  },
  'rng': (command) => {
    const min = getArgs(command)[0];
    const max = getArgs(command)[1];
    response.rng(command, min, max);
  },
  'slotmachine': (command) => {
    const currency = getArgs(command)[0];
    response.slotmachine(command, currency, getUserId(command));
  },
  'rps': (command) => {
    const choice = getArgs(command)[0];
    response.rps(command, choice,isInteraction(command));
  },
  'cookie': (command) => {
    const choice = getArgs(command)[0];
    const args = getArgs(command)[1];
    response.cookie(command, choice, args, getUserId(command));
  },
  'getdata': (command) => {
    const args = getArgs(command);
    response.getData(command, args[0], args[1], getUserId(command), isInteraction(command));
  },
  'help': (command) => {
    response.help(command);
  }
};

function getMessage(command){
  if (isInteraction(command)){
    return command.commandName;
  }
  const result = command.content.slice(commandPrefix.length).trim();
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
    return BigInt(command.user.id);
  } else {
    return BigInt(command.author.id);
  }
}

export default commands;