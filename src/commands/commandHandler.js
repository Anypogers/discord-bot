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
    response.slotmachine(command);
  },
  'rps': (command) => {
    const choice = getArgs(command)[0];
    response.rps(command, choice,isInteraction(command));
  },
  'cookie': (command) => {
    const choice = getArgs(command)[0];
    response.cookie(command, choice, isInteraction(command));
  },
  'getData': (command) => {
    const args = getArgs(command);
    response.getData(command, args[0], args[1]);
  },
  'help': (command) => {
    response.help(command);
  }
};

function getMessage(command){
  if (isInteraction(command)){
    return command.commandName;
  }
  return command.content.slice(commandPrefix.length).trim();
}
  
function getArgs(command){
  if (isInteraction(command)){
    return command.options._hoistedOptions.map(option => option.value);
  }
  return getMessage(command).split(' ').slice(1);
}

function isInteraction(command){
  return command.isCommand && command.commandName !== undefined
}

export default commands;