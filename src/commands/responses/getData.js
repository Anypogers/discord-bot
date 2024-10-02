import { select, join_select} from '../../database/dataManager.js';

export function getData(command, table, who){
  let selection = null;
  if (who == null){
    who = command.author.username;
  }
  who = who.charAt(0).toUpperCase() + who.slice(1);
  if (table == null){
    table = 'users'
  }
  if (table.toLowerCase() in selection_handler){
    selection = selection_handler[table](who);
  }
  if (selection == null){
    command.reply("No data found!");
    return
  }
  if (selection == -1){
    command.reply("No spoilers (:<");
    return
  }
  const selectedKeys = Object.keys(selection);
  const selectedValues = Object.values(selection);
  let selection_result = "";
  for (let i = 0; i < selectedKeys.length; i++) {
    selection_result += `- ${selectedKeys[i]} = ${selectedValues[i]}`;
    if (i != selectedKeys.length - 1){
      selection_result += "\n";
    }
  }
  command.channel.send(`~ __{ Results }__ ~\n${selection_result}`);
}

const selection_handler = {
  'users': (who) => {
    return select(["user_name AS Name", "ethnicity AS Ethnicity"], "users", "user_name", who);
  },
  'bank': (who) => {
    return join_select(["brl AS BRL$", "dollars AS USD$", "gold AS Gold"], "bank", "user_name", who);
  },
  'special_bank': () => {return -1},
  'secret_bank': () => {return -1},
  'hidden_bank': () => {return -1},
}