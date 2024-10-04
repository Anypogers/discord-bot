import { EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const bounties = {
  'reward': "",
  "objective": " ",
  "completed": false
};

export function bounty(command, reward, objective){
  if (BigInt(command.author.id) == process.env.OWNER_ID) {
    if (reward != null) {
      if (reward.toLowerCase() === 'true' || reward.toLowerCase() === 'false') {
        bounties.completed = reward.toLowerCase() === 'true';
      } else {
        bounties.reward = reward;
      }
    }
    if (objective != false) {
      bounties.objective = objective
    }
  }
  command.reply({ephemeral:true, embeds: [show_bounty()]});
}

function show_bounty(){
  const X = bounties.completed ? '~~' : '';
  const embed = new EmbedBuilder()
  .setTitle('**__Bounty Board__**')
  .setDescription(`\n`)
  .setColor('#000000')
  .addFields(
    {
      name: `${X}Reward: ${bounties.reward}${X}`,
      value: `_${X}${bounties.objective}${X}_`,
    }
  );
  return embed;
}