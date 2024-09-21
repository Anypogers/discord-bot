export function echo(command, message){
  command.reply(message || 'Uhhhh, maybe tell me *what* to echo? `&echo %message%`');
}