import { EmbedBuilder } from "discord.js";

export default function slotmachine(command){
  const jackpot = getJackpot(); // [0] = Name | [1] = Pull | [2] = Reward
  const embed = new EmbedBuilder()
    .setTitle('[ ! ] SLOT MACHINE [ ! ]')
    .setDescription(`*Let's Go Gambling!* \n`)
    .setColor('Random')
    .addFields(
      {
        name: 'Possible JackPots:',
        value: '- 1K dollars\n- 150 dollars\n- 75 dollars\n- 25 dollars',
        inline: true,
      },
      {
        name: ' ',
        value: ' ',
        inline: true,
      },
      {
        name: `~ { *Results* }~`,
        value: `Pull : ${jackpot[1]}\nJackpot : ${jackpot[0]}\nReward: ${jackpot[2]}`,
        inline: true,
      }
    );
  command.channel.send({embeds: [embed]});
};

function getJackpot(){
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  if (num1 == 7 && num2 == 7){
    num2 = Math.random() < 0.5 ? num2 : (Math.random() < 0.5 ? 6 : 8);
  }
  let num3 = Math.floor(Math.random() * 10);
  if (num1 == 7 && num2 == 7 && num3 == 7){
    num3 = Math.random() < 0.5 ? num3 : (Math.random() < 0.5 ? 6 : 8);
  }
  let name = 'none';
  let pull = [String(num1)+String(num2)+String(num3)];
  let reward = 0;
  if (num1 === num2 && num2 == num3){
    if (num1 === 7){
      name = 'JACKPOT!!!';
      reward = 1000;
    } else if (num1 === 9 || num1 === 6){
      name = 'blew it';
      reward = 0;
    } else {
      name = 'medium';
      reward = 75;
    }
  } else if ((num1 === num2 - 1 && num2 === num3 - 1) || (num1 === num2 + 1 && num2 === num3 + 1)){
    name = 'big';
    reward = 150;
  } else if (num1 === num2 || num2 === num3){
    name = 'small';
    reward = 25;
  }
  return [name, pull, reward];
}