import { EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const bounty = {
    "objective": null,
    'reward': null,
    "completed": false
};

export function bounty(command, val1, val2){
  if (BigInt(command.author.id) == process.env.OWNER_ID) {
    if (val2 != null) {
      bounty.objective = val1;
      bounty.reward = val2
    } else {
      bounty.completed = val1
    }
    return
  }
  command.reply({ephemeral:true, embeds: [show_bounty()]});
}

function show_bounty(){
  const embed = new EmbedBuilder()
  .setTitle('**__Bounty Board__**')
  .setDescription(`-------------\n`)
  .setColor('#000000')
  .addFields(
    {
      name: `Reward: ${bounty.reward}`,
      value: `"*.${bounty.objective}*"`,
    }
  );
  return embed;
}