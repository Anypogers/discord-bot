import { select, join_select} from '../../database/dataManager.js';
import { loadInventory } from '../../database/dataManager.js';

export function getData(command, table, who, userId, isInteraction){
  let selection = null;
  if (who == null){
    if (isInteraction){
      who = command.user.username;
    } else {
      who = command.author.username;
    }
  }
  who = who.charAt(0).toUpperCase() + who.slice(1);
  if (table == null){
    table = 'users'
  }
  if (table.toLowerCase() in selection_handler){
    selection = selection_handler[table](who, userId);
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
  command.reply({content: `~ __{ Results }__ ~\n${selection_result}`, ephemeral: true});
}

const selection_handler = {
  'users': (who) => {
    return select(["user_name AS Name", "ethnicity AS Ethnicity"], "users", "user_name", who);
  },
  'bank': (who) => {
    return join_select(["brl AS BRL$", "dollars AS USD$", "gold AS Gold"], "bank", "user_name", who);
  },
  'inventory': (who, userId) => {
    const inventoryData = loadInventory(userId);
    if (!inventoryData || !Array.isArray(inventoryData.inventory) || !inventoryData.inventory) {
      return null;
    }
    const result = {};
    for (const item of inventoryData.inventory) {
      const key = `**~ { __${item.name}__ } ~**`;
      const value = `\n*Amount: ${item.amount}*\n\`\`\`${item.description}\n\`\`\``;
      result[key] = value;
  }
    return result;
  },
  'special_bank': () => {return -1},
  'secret_bank': () => {return -1},
  'hidden_bank': () => {return -1},
}