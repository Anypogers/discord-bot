export function help(command){
  const chance = Math.random();
  const responses = [
    "**[!]** *ᵇᵘᵗ ⁿᵒᵇᵒᵈʸ ᶜᵃᵐᵉ*",
    "Why would **I** help **you**?",
    "Nuh uh!",
    "Help? That's a strong word...",
    "Yeah... I'll pass...",
    "Maybe try asking someone else*?*",
    "I'm too busy for that nonsense!",
    "Have you tried turning it on and off*?*",
    "*zzzZZZ*"
  ];
  const randomResponse = responses[Math.floor(chance * responses.length)];
  command.reply({content: randomResponse, ephemeral: true});
}