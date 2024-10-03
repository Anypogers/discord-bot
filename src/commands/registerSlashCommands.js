import dotenv from 'dotenv'
dotenv.config();
import {
  ApplicationCommandOptionType,
  REST,
  Routes
} from 'discord.js';

const commands = [
  {
    name: 'cookie',
    description: 'oh no...',
    options: [
      {
        name: 'what-to-do',
        description: 'What will you do?',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'click',
            value: 'click',
          },
          {
            name: 'shop',
            value: 'shop',
          }
        ],
        required : true
      },
    ],
  },
  {
    name: 'getdata',
    description: 'See some info about some data about some people (most non human)',
    options: [
      {
        name: 'what-data',
        description: 'Data on what?',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'User',
            value: 'users',
          },
          {
            name: 'Bank',
            value: 'bank',
          },
          {
            name: 'Inventory',
            value: 'inventory',
          }
        ],
        required: true
      },
      {
        name: 'who',
        description: 'Data on Who? (doesnt work on inventory)',
        type: ApplicationCommandOptionType.String,
      }
    ],
  },
  {
    name: 'help',
    description: 'See help on commands.'
  },
  {
    name: 'ping',
    description: 'pong'
  },
  {
    name: 'rng',
    description: 'Random Number Generator',
    options: [
      {
        name: 'min-val',
        description: 'Minimum Value',
        type: ApplicationCommandOptionType.Number,
        required: true
      },
      {
        name: 'max-val',
        description: 'Maximum Value',
        type: ApplicationCommandOptionType.Number,
        required: true
      }
    ]
  },
  {
    name: 'rps',
    description: 'Rock... Paper... Scissors... FIGHT!',
    options: [
      {
        name: 'choice',
        description: 'what do you choose?',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'rock',
            value: 'rock'
          },
          {
            name: 'paper',
            value: 'paper'
          },
          {
            name: 'scissors',
            value: 'scissors'
          }
        ],
        required: true
      },
    ],
  },
  {
    name: 'shop',
    description: 'Small shop for some basic items.'
  },
  {
    name: 'slotmachine',
    description: `Let's go gambling!`,
    options: [
      {
        name: 'currency',
        description: 'What currency will you use?',
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: 'dollars',
            value: 'dollars'
          }
        ],
        required: true
      }
    ]
  },
];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try{
    console.log("Registering Slash Commands...")
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.SEVER_ID
      ),
      { body:commands }
    )
  } catch(error){
    console.log(`Oops! \n${error}`);
  }
  console.log("Slash Commands have been registered!")
})();