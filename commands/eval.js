exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (message.author.id !== "198198681982205953") return message.reply("only the bot owner can use eval!");
  const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
    else
      return text;
  };
  try {
    const code = args.join(" ");
    let evaled = eval(code);
    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
    message.channel.send(clean(evaled), { code: "xl" });
  } catch (error) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(error)}\n\`\`\``);
  }
};
