export async function echo(command,message){
  if (message === "" || message == null){
    command.reply("Echo!");
    return
  }
  command.reply(message);
}