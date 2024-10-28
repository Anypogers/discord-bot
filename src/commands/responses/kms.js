import dotenv from 'dotenv'
dotenv.config();

export function kms(command, userId){
  const user = command.guild.members.cache.get(userId);
  if (!user) {
    command.reply({content: "...you don't exist... or something went wrong (prob the latter)", ephemeral:true})
    return;
  }
  if (userId == process.env.OWNER_ID) {
    command.reply("Nooooooo don't kill yourself!!! That's bad!!!!!!")
    return;
  }
  try {
    user.timeout(5 * 1000, 'KYS (Keep Yourself Safe)')
    command.reply({content: "https://tenor.com/view/ltg-gif-24337002", ephemeral:true})
  } catch (error) {
    console.log("Error ocurred on 'kms.js' file.")
    console.log(error);
    command.reply("Uhh... big oopsie, I did something completelly wrong and it broke some shit. oops. :/")
  }
}