export function help(command){
  const chance = Math.random();
  const responses = [
    "**[!]** *ᵇᵘᵗ ⁿᵒᵇᵒᵈʸ ᶜᵃᵐᵉ*", // :scared:
    "Why would **I** help **you**?",
    "Nuh uh!",
    "Help? That's a strong word...",
    "*Yeah*... I'll pass...",
    "Maybe try asking someone else*?*",
    "I'm too busy for that nonsense*!*",
    "Have you tried turning it on and off*?*", // Classic
    "*zzzZZZ*",
    "Did you try Googling it*?*",
    "Go ask ChatGPT.",
    "I invoke the 5th.",
    "+Blocked +DontCare + DidntAsk +SkillIssue +Stfu",
    "_ _", //
    "Check on the wiki.",
    "Hey @Any, can ya help him*?*", // No, I can't.
    "No.", // Yes
    "~~***`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`***~~"
  ];
  const randomResponse = responses[Math.floor(chance * responses.length)]; // Yes, Smart, hmmmm, im so good at programming, yes, thank you.
  command.reply({content: randomResponse, ephemeral: true});
}