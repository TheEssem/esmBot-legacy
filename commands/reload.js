exports.run = async (client, message, args) => {// eslint-disable-line no-unused-vars
  if (message.author.id === client.config.botOwner) {
    if (!args || args.length < 1) return message.reply("you must provide a command to reload!");

    let response = await client.unloadCommand(args[0]);
    if (response) return message.reply(`there was an error unloading the command: ${response}`);

    response = client.loadCommand(args[0]);
    if (response) return message.reply(`there was an error loading the command: ${response}`);

    message.reply(`the command \`${args[0]}\` has been reloaded.`);
  }
};

exports.aliases = [];
