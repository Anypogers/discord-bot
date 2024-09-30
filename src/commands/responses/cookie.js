import { Embed } from "discord.js";

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
      'stock': 25
    },
  ],
  'Rare': [
    {
      'name': 'Dollar',
      'price': 2,
      'stock': 50
    },
    {
      'name': 'Mystery Box',
      'price': 50,
      'stock': 3
    }
  ],
  'ULTRA RARE':[
    {
      'name': 'Secret Box',
      'price': 150,
      'stock': 1
    },
    {
      'name': 'Gold Star',
      'price': 500,
      'stock': 1
    }
  ]
}

export function cookie(command, choice = 'stats', args, isInteraction) {
  if (choice in possibilities){
    possibilities[choice](command, args);
  }
  if (cookies.ammount > cookies.highest){
    cookies.highest = cookies.ammount;
  }
  if (cookies.ammount % 100 == 0 && cookies.ammount == cookies.highest && cookies.ammount > 0){
    command.channel.send(`NEW HIGHSCORE!!!\nTHE SEVER REACHED ${cookies.ammount} COOKIES!!!`);
  }
}

function showShop(){
  if (shop == null) {
    generateShop();
  }
  const embed = new Embed
  shopLayout.setColor(shopTier);
  shopLayout.setTitle('~ { *Cookie Shop* } ~');
  shopLayout.setDescription(`*__Total Cookies: ${cookies.ammount}__*`);
  let fields = new Array(6)
  shopItems.forEach((item, index) => {
    let shouldInline = true ? index == 2 : false;
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
}

function generateShop(){
  for (let i = 0; i < shopItems.length; i++) {
      shopItems[i] = generateSlot();
  }
}

function generateSlot() {
  let slot;
  const chance = Math.ramdom();
  if (chance > 0.90) {
    return null;
  } else if (chance > 0.2){
    slot = 'Common';
  } else if (chance > 0.05){
    slot = 'Rare';
  } else {
    slot = 'ULTRARARE';
  }
  const item = possibleShopItems[slot];
  return item[Math.floor(Math.random() * item.length)];
}

function buyItem(command, itemToBuy){
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
  command.reply(`Thank you for buying ${shopItems[itemToBuy - 1].name}!`);
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
  'shop': (command, args) => {
    if (args[0] == null){
      showShop()
      return
    }
    buyItem(command, +args[0]);
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