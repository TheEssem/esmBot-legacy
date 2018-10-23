exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (message.author.id !== "198198681982205953") return message.reply("only the bot owner can use eval!");
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
  }
};

exports.aliases = [];
