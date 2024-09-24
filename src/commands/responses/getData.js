import { select, join_select} from '../../database/dataManager.js';

export function getData(command, table, who){
  if (who == null){
    who = command.author.username;
  }
  who = who.charAt(0).toUpperCase() + who.slice(1);
  const selection = selection_handler[table](who);
  if (selection == null){
    command.reply("No data found!");
  } else if (selection == -1){
    command.reply("No spoilers (:<")
  } else {
    command.channel.send(`Name: ${selection.user_name}\nEthnicity: ${selection.ethnicity}`);
  }
}

const selection_handler = {
  'users': (who) => {
    return select(["user_name", "ethnicity"], "users", "user_name", who);
  },
  'bank': (who) => {
    return join_select(["brl, dollars, tier"], "normal_bank", "user_name", who);
  },
  'special_bank': () => {return -1},
  'hidden_bank': () => {return -1},
}