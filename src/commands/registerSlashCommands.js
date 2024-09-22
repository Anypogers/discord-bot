import dotenv from 'dotenv'
dotenv.config();
import {
  ApplicationCommandOptionType,
  REST,
  Routes
} from 'discord.js';

const commands = [
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
    name: 'slotmachine',
    description: `Let's go gambling!`
  },
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
          }
        ],
        required : true
      },
    ],
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