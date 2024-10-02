import { select, update } from "../../database/dataManager.js";
import { EmbedBuilder } from "discord.js";

const cookies = {
  "ammount" : 0,
  "highest": 0,
  "eaten": 0
};

const shopItems = new Array(6);

const possibleShopItems = {
  'Common': [
    {
      'name': 'cookie',
      'price': 5,
      'stock': 10,
      'result': function(command) {
        command.reply("Thank you for buying cookies!\n...\n*with cookies...*")
      }
    },
  ],
  'Rare': [
    {
      'name': 'Dollar',
      'price': 2,
      'stock': 10,
      'result': function(command, userId) {
        let user_money = select(['dollars'], 'bank', 'user_id', userId).dollars;
        user_money += 1;
        update('bank', ['dollars'], [(user_money)], 'user_id', userId);
        command.reply("Here is your dollar, and thank you for the cookies!");
      }
    },
    {
      'name': 'Mystery Box',
      'price': 75,
      'stock': 2,
      'result': function(command) {
        command.reply("Hope you get something good!")
      }
    },
    {
      'name': 'Item Upgrade',
      'price': 200,
      'stock': 1,
      'result': function(command) {
        command.reply("Hopefully this will come in handy!")
      }
    },
    {
      'name': 'Simple Key',
      'price': 30,
      'stock': 1,
      'result': function(command) {
        command.reply("Do you have something to use it on?")
      }
    },
  ],
  'ULTRA RARE':[
    {
      'name': 'Gold Star',
      'price': 1000,
      'stock': 1,
      'result': function(command) {
        let user_stars = select(['gold_stars'], 'secret_bank', 'user_id', userId).gold_stars;
        user_stars += 1;
        update('secret_bank', ['gold_stars'], [(user_stars)], 'user_id', userId);
        command.reply("***Oooo So Shiny!~ :niko_SUPER_happy:***")
      }
    },
    {
      'name': 'Gold Star Fragment',
      'price': 300,
      'stock': 1,
      'result': function(command) {
        command.reply("If you can *fuse* it togueter with *other* fragments it will become something **wonderfull**!")
      }
    },
  ]
}

export function cookie(command, choice = 'stats', args = null, userId) {
  if (args == undefined) {
    args = null;
  }
  if (choice in possibilities){
    possibilities[choice](command, args, userId);
  }
  if (cookies.ammount > cookies.highest){
    cookies.highest = cookies.ammount;
  }
  if (cookies.ammount % 100 == 0 && cookies.ammount == cookies.highest && cookies.ammount > 0){
    command.channel.send(`NEW HIGHSCORE!!!\nTHE SEVER REACHED ${cookies.ammount} COOKIES!!!`);
  }
}

function showShop(command){
  const isShopEmpty = shopItems.every(item => item === undefined);
  if (isShopEmpty) {
    generateShop();
  }
  const embed = new EmbedBuilder()
  embed.setTitle('~ { *Cookie Shop* } ~');
  embed.setDescription(`*__Total Cookies: ${cookies.ammount}__*`);
  shopItems.forEach((item, index) => {
    let shouldInline = false ? index == 2 : true;
    if (item) {
      embed.addFields({
        name: `${item.name}`,
        value: `:cookie: : ${item.price}\n[${item.stock}]`,
        inline: shouldInline
      });
    } else {
      embed.addFields({
        name: `Item ${index + 1}`,
        value: '**[**UNAVAILABLE**]**',
        inline: shouldInline
      });
    }
  });
  command.reply({embeds: [embed]});
}

function generateShop(){
  for (let i = 0; i < shopItems.length; i++) {
      shopItems[i] = generateSlot();
  }
}

function generateSlot() {
  let slot;
  const chance = Math.random();
  if (chance > 0.85) {
    return null;
  } else if (chance > 0.3){
    slot = 'Common';
  } else if (chance > 0.05){
    slot = 'Rare';
  } else {
    slot = 'ULTRA RARE';
  }
  const item = possibleShopItems[slot];
  return {...item[Math.floor(Math.random() * item.length)]};
}

function buyItem(command, itemToBuy, userId){
  if (itemToBuy == null || itemToBuy == NaN || itemToBuy < 1 || itemToBuy > 6 || shopItems[itemToBuy - 1] == null) {
    command.reply({
      content: `...what do you want to buy?`,
      ephemeral: true
    });
    return;
  }
  if (shopItems[itemToBuy - 1].stock == 0){
    command.reply({
      content: `Sorry, Out of stock!`,
      ephemeral: true
    });
    return;
  }
  if (shopItems[itemToBuy - 1].price > cookies.ammount) {
    command.reply({
      content: `Sorry, but there aren't enough cookies to buy this!`,
      ephemeral: true
    });
    return
  }
  cookies.ammount -= shopItems[itemToBuy - 1].price;
  shopItems[itemToBuy - 1].stock -= 1;
  shopItems[itemToBuy - 1].result(command, userId)
}

const possibilities = {
  'click': (command) => {
    cookies.ammount += 1;
    command.reply({
      content:`You clicked the cookie!`,
      ephemeral: true
    });
  },
  'eat': (command) => {
    if (cookies.ammount > 0){
      cookies.ammount -= 1;
      cookies.eaten += 1;
      command.reply({
        content:`You ate one cookie!`,
        ephemeral:true
      });
      return;
    }
    command.reply({
      content:`There aren't any cookies to eat...`,
      ephemeral:true
    });
  },
  'shop': (command, args, userId) => {
    if (args == null){
      showShop(command);
      return;
    }
    buyItem(command, +args, userId);
  },
  'stats': (command) => {
    if (Math.random() < 0.2 && cookies.ammount > 1) {
      cookies.ammount -= 1;
      cookies.eaten += 1;
      command.channel.send(`The sever has ${cookies.ammount} cookies!\nThat is one less than it's supposed to be, thats because I ate one!`);
      return;
    }
    let complement;
    switch(cookies.ammount){
      case 0:
        complement = 's...';
        break;
      case 1:
        complement = '!';
        break;
      default:
        complement = 's!';
    }
    command.channel.send(`The sever has ${cookies.ammount} cookie${complement}`);
  },
}