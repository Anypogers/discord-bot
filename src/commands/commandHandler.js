import * as response from './responses/index.js';
const commandPrefix = '&';

const commands = {
  'ping': (command) => {
    response.ping(command);
  },
  'echo': (command) => {
    const text_message = command.content.slice(commandPrefix.length).trim().toLowerCase();
    const message = text_message.split(' ').slice(1).join(' '); // Split the command and extract args
    response.echo(command, message);
  },
  'rng': (command) => {
    const min = getPrefixArgs(getPrefixMessage(command))[0];
    const max = getPrefixArgs(getPrefixMessage(command))[1];
    response.rng(command, min, max);
  },
  'slotmachine': (command) => {
    response.slotmachine(command);
  }
};

function getPrefixMessage(command){
  return command.content.slice(commandPrefix.length).trim().toLowerCase();
}

function getPrefixArgs(message){
  return message.split(' ').slice(1);
}

function getSlashMessage(){
  return;
}

function getSlashArgs(){
  return;
}

export default commands;