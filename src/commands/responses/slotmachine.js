import { EmbedBuilder } from 'discord.js';
import { select, update} from '../../database/dataManager.js';

const allowed_currency = [
  'dollars'
]

export function slotmachine(command, currency, userId){
  const isCurrencyAllowed = (allowed_currency.indexOf(currency) > -1);
  if (!isCurrencyAllowed){
    command.reply({
      content: `Sorry but that currency is not allowed... \n The only currency allowed here are dollars.`,
      ephemeral: true
    });
    return
  }
  let user_money = select(['dollars'], 'normal_bank', 'user_id', userId).dollars
  if (user_money < 5 || user_money == null) {
    if (user_money == null) {
      user_money = 0;
    }
    command.reply({
      content: `You don't have enough money to do this...\n You need at least 5$, you have ${user_money}$`,
      ephemeral: true
    });
    return;
  }
  let jackpot = getJackpot(); // [0] = Name | [1] = Pull | [2] = Reward
  jackpot[2] -= 5;
  user_money += jackpot[2];
  update('normal_bank', ['dollars'], [(user_money)], 'user_id', userId);
  jackpot[2] += 5;
  const sm = generateSlotmachine(currency, jackpot, user_money);
  command.reply({embeds: [sm]});
};

function generateSlotmachine(currency, jackpot, final_balance){
  const embed = new EmbedBuilder()
    .setTitle('[ **!** ] ***SLOT MACHINE*** [ **!** ]')
    .setDescription(`__[Currency: ${currency}]__\n`)
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
        value: `Pull : ${jackpot[1]}\nJackpot : ${jackpot[0]}\nReward: ${jackpot[2]}$\nFinal Balance: ${final_balance}`,
        inline: true,
      }
    );
  return embed;
}

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