const slashCommands = {
  'ping': (interaction) => {
    interaction.reply({content: 'Pong!', ephemeral:true});
  },
  'rng': (interaction) => {
    const min_val = interaction.options.get('min-val').value;
    const max_val = interaction.options.get('max-val').value;
    if (min_val > max_val) {
      interaction.reply({content:'The maximum value needs to be *bigger* than the minimum value, **not** *smaller*', ephemeral:true});
      return;
    }
    // Generate a random number between minVal and maxVal (inclusive)
    const random_number = Math.floor(Math.random() * (max_val - min_val + 1)) + min_val;
    // Reply with the generated random number
    interaction.reply(`Random number between ${min_val} and ${max_val}: ${random_number}`)
  }
};

export default slashCommands;